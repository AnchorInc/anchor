import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
} from './types';

const provider = new firebase.auth.GoogleAuthProvider();

// provider.setCustomParameters({
//   login_hint: 'user@example.com',
// });

export const loginUserWithFB = () => {
  return (dispatch) => {
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, result) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: { user: result.user, token: result.credential.token } });
};
