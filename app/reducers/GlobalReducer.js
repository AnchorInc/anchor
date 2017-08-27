import {
  SHOW_ERROR_MESSAGE,
  CLOSE_ERROR_MESSAGE,
} from '../config';

const INITIAL_STATE = {
  error: false,
  errorMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ERROR_MESSAGE:
      return { ...state, error: true, errorMessage: action.payload };
    case CLOSE_ERROR_MESSAGE:
      return { ...state, error: false, errorMessage: null };
    default:
      return state;
  }
};
