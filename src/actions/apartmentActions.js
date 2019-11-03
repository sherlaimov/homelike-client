import gql from 'graphql-tag';
import { RECEIVE_APARTMENT, REQUEST_APARTMENT } from './types';
import client from '../ApolloClient';

const requestApartment = () => ({ type: REQUEST_APARTMENT });

const fetchApartment = _id => dispatch => {
  dispatch(requestApartment());
  client
    .query({
      query: gql`
    {
      apartment(_id: "${_id}") {
        _id
        owner {
        _id
          email
          #profile {
          #  firstName
          #  lastName
          #  role
          #}
        } 
        title
        location {
          title
        }
        size
        price
        images
        amenities
        details {
          rooms
          bedrooms
          floor
          bathrooms
        } 
        services 
      }
    }`,
    })
    .then(apartment => {
      return dispatch({
        type: RECEIVE_APARTMENT,
        payload: apartment.data,
      });
    });
};

export default fetchApartment;
