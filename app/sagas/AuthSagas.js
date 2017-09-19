import { AsyncStorage } from 'react-native';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import firebase from 'firebase';
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { rsf } from '../App';
import { showErrorMessage, showSpinner, loginUserSuccess, loginUserFail } from '../actions';
import { types } from '../config';


// worker Saga: will be called on GOOGLE_LOGIN_REQUESTED actions
function* loginUserWithGoogle() {
  try {
    const user = yield GoogleSignin.signIn();
    yield put(showSpinner());
    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    const userData = yield call(rsf.auth.signInWithCredential, credential);
    AsyncStorage.setItem('photo_url', userData.photoURL);
    yield put(loginUserSuccess());
  } catch (error) {
    // Error handling for login cancellation by user
    yield put(loginUserFail());
    if (error.code !== 12501) {
      yield put(showErrorMessage(error.message));
    }
  }
}

// worker Saga: will be called on FB_LOGIN_REQUESTED actions
function* loginUserWithFB() {
  const { LoginManager, AccessToken } = FBSDK;
  try {
    const result = yield LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    if (result.isCancelled) return;
    yield put(showSpinner());
    const user = yield AccessToken.getCurrentAccessToken();
    const credential = firebase.auth.FacebookAuthProvider.credential(user.accessToken);
    const userData = yield call(rsf.auth.signInWithCredential, credential);
    AsyncStorage.setItem('photo_url', userData.photoURL);
  } catch (error) {
    yield put(loginUserFail());
    yield put(showErrorMessage(error.message));
  }
}

export function* watchLoginRequests() {
  yield all([
    takeLatest(types.LOGIN.GOOGLE, loginUserWithGoogle),
    takeLatest(types.LOGIN.FB, loginUserWithFB),
  ]);
}
