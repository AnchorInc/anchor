import { put, takeLatest, fork } from 'redux-saga/effects';
import firebase from 'firebase';
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
  GOOGLE_LOGIN_REQUEST,
  FB_LOGIN_REQUEST,
} from './';

const loginUserFail = (error) => {
  return { type: LOGIN_USER_FAIL, payload: error };
};

const loginUserSuccess = () => {
  return { type: LOGIN_USER_SUCCESS };
};

const startAuth = () => {
  return { type: START_AUTH };
};

// worker Saga: will be called on GOOGLE_LOGIN_REQUESTED actions
function* loginUserWithGoogle() {
  const googleProvider = firebase.auth.GoogleAuthProvider;

  yield GoogleSignin.signIn()
  .then((user) => {
    put(startAuth());
    const credential = googleProvider.credential(user.idToken);
    return firebase.auth().signInWithCredential(credential);
  })
  .then(() => {
    put(loginUserSuccess());
  })
  .catch((error) => {
    if (error.code !== 12501) {
      console.log(error);
      put(loginUserFail(error.message));
    }
  });
}

// worker Saga: will be called on FB_LOGIN_REQUESTED actions
function* loginUserWithFB() {
  const fbProvider = firebase.auth.FacebookAuthProvider;
  const { LoginManager, AccessToken } = FBSDK;

  yield LoginManager.logInWithReadPermissions(['public_profile', 'email'])
  .then((result) => {
    if (result.isCancelled) {
      return;
    }
    put(startAuth());
    AccessToken.getCurrentAccessToken()
    .then((user) => {
      const credential = fbProvider.credential(user.accessToken);
      return firebase.auth().signInWithCredential(credential);
    })
    .then(() => {
      put(loginUserSuccess());
    });
  })
  .catch((error) => {
    put(loginUserFail(error.message));
  });
}

function* watchLoginRequests() {
  yield takeLatest(GOOGLE_LOGIN_REQUEST, loginUserWithGoogle);
  yield takeLatest(FB_LOGIN_REQUEST, loginUserWithFB);
}

export default function* rootSaga() {
  yield fork(watchLoginRequests);
}
