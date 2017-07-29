import firebase from 'firebase';
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
} from './types';

const fbProvider = firebase.auth.FacebookAuthProvider;
const { LoginManager, AccessToken } = FBSDK;
const googleProvider = firebase.auth.GoogleAuthProvider;

export const loginUserWithFB = () => {
  return (dispatch) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return;
      }
      startAuth(dispatch);
      AccessToken.getCurrentAccessToken()
      .then((user) => {
        const credential = fbProvider.credential(user.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then(() => {
        loginUserSuccess(dispatch);
      });
    })
    .catch((error) => {
      loginUserFail(dispatch, error.message);
    });
  };
};

export const loginUserWithGoogle = () => {
  return (dispatch) => {
    GoogleSignin.signIn()
    .then((user) => {
      startAuth(dispatch);
      const credential = googleProvider.credential(user.idToken);
      return firebase.auth().signInWithCredential(credential);
    })
    .then(() => {
      loginUserSuccess(dispatch);
    })
    .catch((error) => {
      if (error.code !== 12501) {
        console.log(error);
        loginUserFail(dispatch, error.message);
      }
    });
  };
};

export const closeErrorMessage = () => {
  return {
    type: 'close_error_message',
  };
};

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

const loginUserSuccess = (dispatch) => {
  dispatch({ type: LOGIN_USER_SUCCESS });
};

const startAuth = (dispatch) => {
  dispatch({ type: START_AUTH });
};
