import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
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
        return;
      }

      startAuth(dispatch);

      AccessToken.getCurrentAccessToken()
      .then((data) => {
        const credential = provider.credential(data.accessToken);
        AsyncStorage.setItem('user_credential', JSON.stringify(data.accessToken, undefined, undefined));
        return firebase.auth().signInWithCredential(credential);
      })
      .then((userData) => {
        console.log(userData);
        loginUserSuccess(dispatch);
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
      // console.log(`Credential: ${JSON.stringify(credential, undefined, 2)}`);
      AsyncStorage.setItem('user_credential', JSON.stringify(user, undefined, undefined))
      .catch(() => {
        console.log('could not set item');
      });
      return firebase.auth().signInWithCredential(credential);
    })
    .then((userData) => {
      console.log(`Login successful: ${JSON.stringify(userData, undefined, 2)}`);
      loginUserSuccess(dispatch);
    })
    .catch((error) => {
      loginUserFail(dispatch, error.message);
    });
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
