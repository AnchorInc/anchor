import {
<<<<<<< HEAD
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
=======
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
>>>>>>> c15d23b828db3439d889efa237add9190378540c
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  token: '',
  user: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication failed', password: '', loading: false };
    default:
      return state;
  }
};
