import { AsyncStorage } from 'react-native';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

import { showErrorMessage, showSpinner, loginSuccess, loginFail } from '../actions';
import { actionTypes, firebasePaths, userTypes, signinMethods } from '../config';


const auth = firebase.auth();

// worker Saga: will be called on GOOGLE_LOGIN_REQUESTED actions
function* loginUserWithGoogle(action) {
  try {
    // get the id token from google
    const user = yield call([GoogleSignin, GoogleSignin.signIn]);
    yield put(showSpinner());
    // create a firebase credential using that
    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    // sign in to firebase and get the user credentials
    const userCred = yield call([auth, auth.signInAndRetrieveDataWithCredential], credential);

    yield call(initUser, action, userCred);

    yield put(loginSuccess());
  } catch (error) {
    // Error handling for login cancellation by user
    yield put(loginFail());
    console.log(error);
    if (error.code !== 12501) {
      // error code 12501 is just when the user cancels the sign in by pressing outside the modal
      yield put(showErrorMessage(error.message));
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
    yield put(loginFail());
    yield put(showErrorMessage(error.message));
  }
}

// worker Saga: will be called on LOGOUT actions
function* logoutUser() {
  try {
    // get the sign in method
    const method = JSON.parse(yield call([AsyncStorage, AsyncStorage.getItem], 'signin_method'));
    // sign out using the same api used to sign in
    switch (method) {
      case signinMethods.GOOGLE:
        yield call([GoogleSignin, GoogleSignin.signOut]);
        break;
      case signinMethods.FB:
        yield call([LoginManager, LoginManager.logOut]);
        break;
      default:
        break;
    }
    // sign out from firebase
    yield call([auth, auth.signOut]);
  } catch (error) {
    console.log(error);
  }
}

function* initUser(action, userCred) {
  // get a db reference to the user
  const userPath = getUserPath(action);
  const user = userCred.user._user;
  const ref = firebase.database().ref(userPath + user.uid);

  let userData;
  // check if the user already exists
  if (userCred.additionalUserInfo.isNewUser) {
    console.log('new user');
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
    yield call([ref, ref.set], userData);
  } else {
    // get the existing user data and store it
    const snapshot = yield call([ref, ref.once], 'value');
    userData = snapshot.val();
  }

  // store the user path and user data in the cache
  yield call([AsyncStorage, AsyncStorage.multiSet],
    [['user_path', JSON.stringify(userPath)],
    ['user_data', JSON.stringify(userData)],
    ['signin_method', JSON.stringify(action.method)]]);
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

export function* watchLoginRequests() {
  yield all([
    takeLatest(actionTypes.AUTH.LOGIN.GOOGLE, loginUserWithGoogle),
    takeLatest(actionTypes.AUTH.LOGIN.FB, loginUserWithFB),
    takeLatest(actionTypes.AUTH.LOGOUT.REQUEST, logoutUser),
  ]);
}
