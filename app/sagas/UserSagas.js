import { AsyncStorage } from 'react-native';
import { eventChannel } from 'redux-saga';
import { takeLatest, all, put, call, take, takeEvery, cancel } from 'redux-saga/effects';
import firebase from 'react-native-firebase';

import { syncUser, getUser } from '../actions';
import { actionTypes } from '../config';

function* updateUserSaga(action) {
  // update the user data on the cloud
  const ref = yield call(getUserRef);
  yield call([ref, ref.update], action.user);
}

function* userListenerSaga() {
  /* sync the user from the cloud and store it on the device
  also call the getUserSaga to update the user reducer state with the latest user data */
  const ref = yield call(getUserRef);
  if (!ref) yield cancel();
  // get the event channel
  const channel = yield call(userEventListener, ref);
  // while there is a user logged in...
  while (firebase.auth().currentUser) {
    // get the data emitted from the channel
    const user = yield take(channel);

    try {
      // update the cached user data with the new user daya
      yield call([AsyncStorage, AsyncStorage.setItem], 'user_data', JSON.stringify(user));
      // update the user reducer
      yield put(getUser());
    } catch (error) {
      console.log(error);
    }
  }
  channel.close();
}

function* getUserSaga() {
  try {
    // get the user data stored on the device
    const data = yield call([AsyncStorage, AsyncStorage.getItem], 'user_data');
    const user = JSON.parse(data);
    // send it to the user reducer
    yield put(syncUser(user));
  } catch (error) {
    console.log(error);
  }
}

function* getUserRef() {
  // get the user path string stored on the device
  const userCollection = yield call([AsyncStorage, AsyncStorage.getItem], 'user_collection');
  console.log(userCollection);
  if (!userCollection) {
      return undefined;
  }
  return firebase.firestore().collection(userCollection).doc(firebase.auth().currentUser.uid);
}

const userEventListener = (ref) => {
  // create a redux saga event channel to listen for changes to the user data on the cloud
  const channel = eventChannel((emitter) => {
    // call the onSnapshot listener function in firestore and emit the user data
    ref.onSnapshot(doc => emitter(doc.data()));
    // return the unsubscribe function
    return () => ref.onSnapshot(() => {});
  });
  // return the event channel
  return channel;
};

function* fcmTokenSaga() {
  // let token = yield call([firebase.messaging(), firebase.messaging().getToken]);
  // yield call(updateUserSaga, { user: { fcmToken: token } });

  const channel = yield call(fcmTokenRefreshListener);
  while (firebase.auth().currentUser) {
    token = yield take(channel);
    yield call(updateUserSaga, { user: { fcmToken: token } });
  }
  channel.close();
}

const fcmTokenRefreshListener = () => {
  const channel = eventChannel((emitter) => {
    return firebase.messaging().onTokenRefresh((token) => {
      emitter(token);
    });
  });
  return channel;
};

export function* watchUserRequests() {
  yield all([
    takeLatest([actionTypes.AUTH.LOGIN.SUCESS, actionTypes.USER.LISTEN], userListenerSaga),
    takeLatest(actionTypes.USER.GET, getUserSaga),
    takeLatest(actionTypes.USER.START_FCM_TOKEN_LISTENER, fcmTokenSaga),
    takeEvery(actionTypes.USER.UPDATE, updateUserSaga),
  ]);
}
