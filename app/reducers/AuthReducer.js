import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
  CLOSE_ERROR_MESSAGE,
} from '../config';

const INITIAL_STATE = {
  user: null,
  errorMessage: null,
  error: false,
  loading: false,
  isError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, errorMessage: null, loading: false, isError: false };
    case LOGIN_USER_FAIL:
      return { ...state, errorMessage: action.payload, loading: false, isError: true };
    case START_AUTH:
      return { ...state, errorMessage: null, loading: true, isError: false };
    case CLOSE_ERROR_MESSAGE:
      return { ...state, isError: false, loading: false };
    default:
      return state;
  }
};
