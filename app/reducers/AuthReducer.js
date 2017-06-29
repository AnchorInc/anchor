import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, error: false, loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: true, loading: false };
    case START_AUTH:
      return { ...state, error: false, loading: true };
    default:
      return state;
  }
};
