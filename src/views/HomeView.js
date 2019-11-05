import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ApartmentTileView from './ApartmentTileView';

const APARTMENT_LIST = gql`
  {
    apartments(active: true) {
      items {
        _id
        owner {
          _id
          email
        }
        title
        location {
          title
        }
        size
        price
        amenities
        images
      }
    }
  }
`;

const HomeView = () => {
  const { loading, error, data } = useQuery(APARTMENT_LIST);

  if (loading) {
    return <div>Loading...</div>;
  }
  const { items: apartments } = data.apartments;

  return (
    <div className="container-list container-lg clearfix">
      <div className="col-12 float-left">
        <div className="view-apartment-list">
          {apartments.length > 0 &&
            apartments.map((item, index) => <ApartmentTileView key={index} apartment={item} />)}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
