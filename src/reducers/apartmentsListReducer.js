import { RECEIVE_APARTMENTS_LIST, REQUEST_APARTMENTS_LIST } from '../actions/types';

const initialState = {
  apartments: {},
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_APARTMENTS_LIST:
      return {
        ...state,
        apartments: action.payload.apartments,
        isLoading: false
      };
    case REQUEST_APARTMENTS_LIST:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
};
