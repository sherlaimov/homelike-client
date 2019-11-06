import React, { useEffect, useReducer } from 'react';
import debounce from 'lodash.debounce';
import Select from 'react-select';
import ApartmentTileView from './ApartmentTileView';
import searchReducer from '../reducers/searchReducer';

import constants from '../constants';

const initialState = {
  searchValue: '',
  filters: {
    bathrooms: { options: ['all'], value: 'all' },
    bedrooms: { options: ['all'], value: 'all' },
    floor: { options: ['all'], value: 'all' },
    rooms: { options: ['all'], value: 'all' },
    size: { options: ['all'], value: 'all' },
    price: { options: ['all'], value: 'all' },
    amenities: { options: ['all'], value: 'all' },
    services: { options: ['all'], value: 'all' }
  },
  data: [],
  cache: []
};

const Search = () => {
  const apartmentsUrl = `${constants.baseUrl}apartments/`;
  const locationsUrl = `${constants.baseUrl}locations/`;

  const [state, dispatch] = useReducer(searchReducer, initialState);

  const { searchValue, data, filters } = state;

  const onSearch = e => {
    const { value } = e.target;
    dispatch({ type: 'SET_SEARCH_VALUE', value: value.toLowerCase() });
    handleSearch();
  };

  const handleSearch = debounce(() => {
    dispatch({ type: 'APPLY_SEARCH' });
  }, 250);

  const setFilterStatesAndDispatch = _data => {
    const target = {
      bathrooms: [],
      bedrooms: [],
      floor: [],
      rooms: [],
      size: [],
      price: [],
      amenities: [],
      services: []
    };
    const allFilters = _data.reduce((acc, b) => {
      acc.bathrooms.push(b.bathrooms);
      acc.bedrooms.push(b.bedrooms);
      acc.floor.push(b.floor);
      acc.rooms.push(b.rooms);
      acc.size.push(b.size);
      acc.price.push(b.price);
      acc.amenities.push(...b.amenities);
      acc.services.push(...b.services);
      return acc;
    }, target);

    const uniqueFilters = Object.entries(allFilters).reduce((acc, entry) => {
      acc[`${entry[0]}`] = { options: [...new Set(entry[1]), 'all'], value: 'all' };
      return acc;
    }, {});

    dispatch({ type: 'DATA_AND_FILTERS_READY', payload: { data: _data, filters: uniqueFilters } });
  };

  const mapLocAndDetail = (apartments, locations) =>
    apartments
      .map(apart => {
        const loc = locations.find(l => l._id === apart.location);
        const newApart = { ...apart };
        newApart.location = loc.title;
        return newApart;
      })
      .map(apart => {
        const newApart = { ...apart };
        Object.keys(apart.detail).forEach(key => {
          newApart[key] = apart.detail[key];
        });
        delete newApart.detail;
        return newApart;
      });

  const handleFilterChange = (val, meta) => {
    dispatch({ type: 'FILTER_APPLIED', payload: { name: meta.name, value: val.value } });
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // FETCH apartments
        const apartResult = await fetch(apartmentsUrl);
        const apartJson = await apartResult.json();

        // FETCH locations
        const locResult = await fetch(locationsUrl);
        const locJson = await locResult.json();
        const mappedData = mapLocAndDetail(apartJson, locJson);
        setFilterStatesAndDispatch(mappedData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchResources();
  }, []);

  const capitalize = o =>
    o
      .toString()
      .charAt(0)
      .toUpperCase() + o.toString().slice(1);

  return (
    <div className="search-page container-list container-lg clearfix">
      <div className="search">
        <input
          type="text"
          placeholder="Search by locations"
          value={searchValue}
          onChange={onSearch}
        />
      </div>
      <ul className="filters">
        {filters &&
          Object.entries(filters).map(([key, val], idx) => (
            <li key={idx}>
              {key}
              <Select
                name={key}
                key={idx}
                value={{ value: val.value, label: capitalize(val.value) }}
                onChange={handleFilterChange}
                options={val.options.map(o => ({
                  value: o.toString(),
                  label: capitalize(o)
                }))}
              />
            </li>
          ))}
      </ul>
      <div className="col-12 float-left">
        <p>
          Total apartments
          {data.length}
        </p>
        <div className="view-apartment-list">
          {data.length > 0 &&
            data.map((item, index) => <ApartmentTileView key={index} apartment={item} />)}
        </div>
      </div>
    </div>
  );
};
export default Search;
