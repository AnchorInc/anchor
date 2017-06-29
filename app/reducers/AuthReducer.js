import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  errorMessage: null,
<<<<<<< HEAD
  error: false,
=======
>>>>>>> 9210077db5f83d944e1773c50f021b7f18026714
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
    default:
      return state;
  }
};
