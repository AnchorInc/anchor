import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
} from '../config';

const INITIAL_STATE = {
  user: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false };
    case START_AUTH:
      return { ...state, loading: true };
    default:
      return state;
  }
};
