import firebase from 'firebase';
import {
<<<<<<< HEAD
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from './types';

export const loginUserWithFB = () => {
  return (dispatch) => {

=======
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
>>>>>>> c15d23b828db3439d889efa237add9190378540c
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, result) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: { user: result.user, token: result.credential.token } });
};
