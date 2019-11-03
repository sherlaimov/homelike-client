import { RECEIVE_APARTMENT, REQUEST_APARTMENT } from './../actions/types';

const initialState = {
  apartment: {},
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_APARTMENT:
      return {
        ...state,
        apartment: action.payload.apartment,
        isLoading: false,
      };
    case REQUEST_APARTMENT:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
