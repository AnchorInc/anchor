import { AsyncStorage } from 'react-native';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { Promise } from 'es6-promise';

import { showErrorMessage, showSpinner, loginUserSuccess, loginUserFail } from '../actions';
import { actionTypes, firebasePaths, userTypes } from '../config';


const auth = firebase.auth();

// worker Saga: will be called on GOOGLE_LOGIN_REQUESTED actions
function* loginUserWithGoogle(action) {
  try {
    // get the id token from google
    const user = yield call(googlesignin);
    yield put(showSpinner());
    // create a firebase credential using that
    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    // sign in to firebase and get the user credentials
    const userCred = yield call([auth, auth.signInAndRetrieveDataWithCredential], credential);

    yield call(initUser, action, userCred);

    yield put(loginUserSuccess());
  } catch (error) {
    // Error handling for login cancellation by user
    yield put(loginUserFail());
    if (error.code !== 12501) {
      // yield put(showErrorMessage(error.message));
    }
  }
}

// worker Saga: will be called on FB_LOGIN_REQUESTED actions
function* loginUserWithFB(action) {
  try {
    // login to fb
    const result = LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    if (result.isCancelled) return;
    yield put(showSpinner());
    // get the user id token
    const user = AccessToken.getCurrentAccessToken();
    // get a firebase credential using the user id token
    const credential = firebase.auth.FacebookAuthProvider.credential(user.idToken);
    // sign in to firebase and get the user credentials
    const userCred = yield call([auth, auth.signInAndRetrieveDataWithCredential], credential);

    yield call(initUser, action, userCred);
  } catch (error) {
    yield put(loginUserFail());
    yield put(showErrorMessage(error.message));
  }
}

const getUserPath = (action) => {
  switch (action.userType) {
    case userTypes.STUDENT:
      // return '/students'
      return firebasePaths.STUDENTS;
    case userTypes.TEACHER:
      // return '/teachers'
      return firebasePaths.TEACHERS;
    default:
      throw new Error('User is not student or teacher');
  }
};

function* initUser(action, userCred) {
  // get a db reference to the user
  const userPath = getUserPath(action);
  const user = userCred.user._user;
  const ref = firebase.database().ref(userPath + user.uid);

  let userData;
  // check if the user already exists
  if (userCred.additionalUserInfo.isNewUser) {
    // create a new user in firebase
    userData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      isDeleted: false,
      phoneNumber: user.phoneNumber,
      type: action.userType,
      donePref: false,
    };
    yield call([ref, ref.push], userData);
  } else {
    // get the existing user data and store it
    const snapshot = yield call([ref, ref.once], 'value');
    userData = snapshot.val();
  }

  // store the user path and user data in the cache
  yield call([AsyncStorage, AsyncStorage.setItem], 'user_path', JSON.stringify(userPath));
  yield call([AsyncStorage, AsyncStorage.setItem], 'user_data', JSON.stringify(userData));
}

const googlesignin = () => {
  return new Promise((res, rej) => {
    GoogleSignin.signIn()
    .then((user) => { res(user); })
    .catch(() => rej(new Error('Could not sign in. Please try again')));
  });
};

export function* watchLoginRequests() {
  yield all([
    takeLatest(actionTypes.LOGIN.GOOGLE, loginUserWithGoogle),
    takeLatest(actionTypes.LOGIN.FB, loginUserWithFB),
  ]);
}
