import firebase from 'firebase';
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
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

      AccessToken.getCurrentAccessToken()
      .then((data) => {
        const credential = provider.credential(data.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((loginData) => {
        console.log(loginData);
        console.log('login successful!');
      })
      .catch((error) => {
        console.log(error);
        console.log('login unsuccessful!');
      });
    })
    .catch((error) => {
      console.log(error);
      console.log('login unsuccessful');
    });
  };
};

export const loginUserWithGoogle = () => {
  return (dispatch) => {
    GoogleSignin.signIn()
    .then((user) => {
      const credential = googleProvider.credential(user.accessToken);
      return firebase.auth().signInWithCredential(credential)
      .then((loginData) => {
        console.log(loginData);
        console.log('login successful!');
      })
      .catch((error) => {
        console.log(error);
        console.log('login unsuccessful!');
      });
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, result) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: { user: result.user, token: result.credential.token } });
};
