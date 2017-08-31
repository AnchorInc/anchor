import { put, takeLatest, takeEvery, fork } from 'redux-saga/effects';
import firebase from 'firebase';
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import _ from 'lodash';
import {
  GOOGLE_LOGIN_REQUEST,
  FB_LOGIN_REQUEST,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
} from '../config';
import { showErrorMessage, startAuth, loginUserSuccess, loginUserFail, sendUserProfile } from '../actions';
import { getUser } from '../models/User';

// worker Saga: will be called on GOOGLE_LOGIN_REQUESTED actions
function* loginUserWithGoogle() {
  try {
    const googleProvider = firebase.auth.GoogleAuthProvider;
    const user = yield GoogleSignin.signIn();
    yield put(startAuth());
    const credential = googleProvider.credential(user.idToken);
    yield firebase.auth().signInWithCredential(credential);
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
  try {
    const fbProvider = firebase.auth.FacebookAuthProvider;
    const { LoginManager, AccessToken } = FBSDK;
    const result = yield LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    if (result.isCancelled) return;
    yield put(startAuth());
    const user = yield AccessToken.getCurrentAccessToken();
    const credential = fbProvider.credential(user.accessToken);
    yield firebase.auth().signInWithCredential(credential);
    yield put(loginUserSuccess());
  } catch (error) {
    yield put(loginUserFail());
    yield put(showErrorMessage(error.message));
  }
}

// watcher Saga that watches for any login request action types
function* watchLoginRequests() {
  yield takeLatest(GOOGLE_LOGIN_REQUEST, loginUserWithGoogle);
  yield takeLatest(FB_LOGIN_REQUEST, loginUserWithFB);
}

function* getUserProfile() {
  const profile = _.pick(yield getUser(), ['displayName', 'photoURL', 'email', 'phoneNumber']);
  yield put(sendUserProfile(profile));
}

function* updateUserProfile() {
  yield console.log('updating user profile');
}

function* watchUserProfileRequests() {
  yield takeEvery(UPDATE_USER_PROFILE, updateUserProfile);
  yield takeEvery(GET_USER_PROFILE, getUserProfile);
}

export default function* rootSaga() {
  yield fork(watchLoginRequests);
  yield fork(watchUserProfileRequests);
}
