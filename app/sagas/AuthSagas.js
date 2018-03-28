import { AsyncStorage } from 'react-native';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import firebase from 'firebase';
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { rsf } from '../App';
import { showErrorMessage, showSpinner, loginUserSuccess, loginUserFail } from '../actions';
import { types, firebasePaths, userTypes } from '../config';


// worker Saga: will be called on GOOGLE_LOGIN_REQUESTED actions
function* loginUserWithGoogle(action) {
  try {
    const user = yield GoogleSignin.signIn();
    yield put(showSpinner());
    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    const userData = yield call(rsf.auth.signInWithCredential, credential);
    let firebasePath;

    switch(action.userType) {
      case userTypes.STUDENT:
        firebasePath = firebasePaths.STUDENTS;
        break;
      case userTypes.TEACHER:
        firebasePath = firebasePaths.TEACHERS;
        break;
      default:
        throw "User is not student or teacher";
        break; 
    }
    console.log(firebasePath);
    const result = yield call(rsf.database.update, firebasePath + userData.uid, {
      displayName: userData.displayName,
      email: userData.email,
      photoURL: userData.photoURL,
      uid: userData.uid,
      isDeleted: false,
      phoneNumber: userData.phoneNumber,
      batchList: []
    });
    AsyncStorage.setItem('user_data', JSON.stringify(userData, undefined, undefined));
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
function* loginUserWithFB(action) {
  const { LoginManager, AccessToken } = FBSDK;
  try {
    const result = yield LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    if (result.isCancelled) return;
    yield put(showSpinner());
    const user = yield AccessToken.getCurrentAccessToken();
    const credential = firebase.auth.FacebookAuthProvider.credential(user.accessToken);
    const userData = yield call(rsf.auth.signInWithCredential, credential);
    AsyncStorage.setItem('user_data', JSON.stringify(userData, undefined, undefined));
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
