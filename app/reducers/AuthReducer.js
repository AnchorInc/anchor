import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
} from '../actions/types';

const INITIAL_STATE = {
<<<<<<< HEAD
  user: null,
  errorMessage: null,
=======
  error: false,
>>>>>>> 4d192c9c18e067b06a894130cc411d4e6a7bd2af
  loading: false,
  isError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
<<<<<<< HEAD
      return { ...state, user: action.payload, errorMessage: null, loading: false, isError: false };
=======
      return { ...state, error: false, loading: false };
>>>>>>> 4d192c9c18e067b06a894130cc411d4e6a7bd2af
    case LOGIN_USER_FAIL:
      return { ...state, errorMessage: action.payload, loading: false, isError: true };
    case START_AUTH:
      return { ...state, errorMessage: null, loading: true, isError: false };
    default:
      return state;
  }
};
