import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
} from './types';
import { PROVIDER_FB, PROVIDER_GOOGLE, USER_TOKEN, PROVIDER } from '../config';

const provider = firebase.auth.FacebookAuthProvider;
const { LoginManager, AccessToken } = FBSDK;
const googleProvider = firebase.auth.GoogleAuthProvider;

let userToken = null;

export const loginUserWithFB = () => {
  return (dispatch) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        userToken = null;
        return;
      }
      startAuth(dispatch);
      AccessToken.getCurrentAccessToken()
      .then((user) => {
        const credential = provider.credential(user.accessToken);
        userToken = user.accessToken;
        return firebase.auth().signInWithCredential(credential);
      })
      .then(() => {
        loginUserSuccess(dispatch, PROVIDER_FB);
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
      userToken = user.idToken;
      return firebase.auth().signInWithCredential(credential);
    })
    .then(() => {
      loginUserSuccess(dispatch, PROVIDER_GOOGLE);
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

const loginUserSuccess = (dispatch, providerType) => {
  AsyncStorage.multiSet([[USER_TOKEN, JSON.stringify(userToken, undefined, undefined)], [PROVIDER, providerType]])
  .catch((error) => {
    console.log(error);
  });
  dispatch({ type: LOGIN_USER_SUCCESS });
};

const startAuth = (dispatch) => {
  dispatch({ type: START_AUTH });
};
