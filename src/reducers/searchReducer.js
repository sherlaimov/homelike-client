const filterAll = (apartments, _filters) => {
  if (_filters.length <= 0) {
    return apartments;
  }
  const [filterName, v] = _filters[0];

  if (v.value === 'all') {
    return filterAll(apartments, _filters.slice(1));
  }

  const filtered = apartments.filter(apart => {
    if (Array.isArray(apart[filterName])) {
      return apart[filterName].includes(v.value);
    }
    return apart[filterName] === parseInt(v.value, 10);
  });

  return filterAll(filtered, _filters.slice(1));
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_VALUE': {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case 'APPLY_SEARCH': {
      const prefiltered = filterAll(state.cache, Object.entries(state.filters));
      const filtered = prefiltered.filter(a =>
        a.location.toLowerCase().includes(state.searchValue)
      );
      return {
        ...state,
        data: filtered,
      };
    }
    case 'DATA_AND_FILTERS_READY':
      return {
        ...state,
        filters: action.payload.filters,
        data: action.payload.data,
        cache: action.payload.data,
      };
    case 'FILTER_APPLIED': {
      const { name, value } = action.payload;

      const filters = {
        ...state.filters,
        [`${name}`]: { options: state.filters[name].options, value },
      };

      const filtered = filterAll(state.cache, Object.entries(filters));
      return {
        ...state,
        data: filtered,
        filters,
      };
    }
    default:
      throw new Error('Unexpected action');
  }
};

export default searchReducer;
