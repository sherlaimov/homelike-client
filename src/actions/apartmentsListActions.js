import gql from 'graphql-tag';
import { RECEIVE_APARTMENTS_LIST, REQUEST_APARTMENTS_LIST } from './types';
import client from '../ApolloClient';

const requestApartmentsList = () => ({ type: REQUEST_APARTMENTS_LIST });

const fetchApartmentsList = () => dispatch => {
  dispatch(requestApartmentsList());
  client
    .query({
      query: gql`
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
      `
    })
    .then(apartments =>
      dispatch({
        type: RECEIVE_APARTMENTS_LIST,
        payload: apartments.data
      })
    );
};

export default fetchApartmentsList;
