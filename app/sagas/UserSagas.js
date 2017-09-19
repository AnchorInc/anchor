import { AsyncStorage } from 'react-native';
import { takeLatest, all, put, call, take } from 'redux-saga/effects';
import firebase from 'firebase';
import { rsf } from '../App';
import { syncUser } from '../actions';
import { types } from '../config';

function* updateUser() {
  yield console.log('updating user profile');
}

function* deleteUser() {
  yield console.log('deleting user');
}

function* getUser() {
  const path = `/users/students/${firebase.auth().currentUser.uid}`;
  const channel = yield call(rsf.database.channel, path);

  while (true) {
    const { value: user } = yield take(channel);
    yield put(syncUser(user));
  }
}

function* userSetup() {
  const data = yield AsyncStorage.multiGet(['done_pref', 'photo_url']);
  const setupData = {
    donePref: data[0][1],
    photoURL: JSON.parse(data[1][1]),
  };
  console.log(data);
  console.log(setupData);
  yield put({ type: types.USER.SYNC_SETUP, setupData });
}

export function* watchUserRequests() {
  yield all([
    takeLatest(types.USER.GET, getUser),
    takeLatest(types.USER.UPDATE, updateUser),
    takeLatest(types.USER.DELETE, deleteUser),
    takeLatest(types.USER.SETUP, userSetup),
  ]);
}
