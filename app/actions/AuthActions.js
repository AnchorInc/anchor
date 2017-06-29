import firebase from 'firebase';
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
} from './types';

const provider = firebase.auth.FacebookAuthProvider;
const { LoginManager, AccessToken } = FBSDK;

const googleProvider = firebase.auth.GoogleAuthProvider;

export const loginUserWithFB = () => {
  return (dispatch) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        console.log('user canceled');
        return;
      }

      startAuth(dispatch);

      AccessToken.getCurrentAccessToken()
      .then((data) => {
        const credential = provider.credential(data.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((loginData) => {
        console.log(loginData);
        loginUserSuccess(dispatch, loginData);
      });
    })
    .catch((error) => {
      console.log(error);
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
      console.log(`Credential: ${JSON.stringify(credential, undefined, 2)}`);
      return firebase.auth().signInWithCredential(credential);
    })
    .then((loginData) => {
      console.log(`Login successful: ${JSON.stringify(loginData, undefined, 2)}`);
      loginUserSuccess(dispatch, loginData);
    })
    .catch((error) => {
      console.log(`Login unsuccessful: ${JSON.stringify(error, undefined, 2)}`);
      loginUserFail(dispatch, error.message);
    });
  };
};

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

const loginUserSuccess = (dispatch, result) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: result });
};

const startAuth = (dispatch) => {
  dispatch({ type: START_AUTH });
};
