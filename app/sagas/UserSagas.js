import { AsyncStorage } from 'react-native';
import { takeLatest, all, put, call, take } from 'redux-saga/effects';
import firebase from 'firebase';
import { rsf } from '../App';
import { syncUser, getUser } from '../actions';
import { types } from '../config';

function* updateUserSaga(action) {
  const userPath = yield call(AsyncStorage.getItem, 'user_path');
  const path = `${userPath}${firebase.auth().currentUser.uid}`;
  yield call(rsf.database.patch, path, action.user);
}

function* deleteUser() {
  yield console.log('deleting user');
}

function* syncUserSaga() {
  const userPath = yield call(AsyncStorage.getItem, 'user_path');
  const path = `${userPath}${firebase.auth().currentUser.uid}`;
  const channel = yield call(rsf.database.channel, path);

  while (firebase.auth().currentUser) {
    const { value: user } = yield take(channel);

    try {
      yield call(AsyncStorage.setItem, 'user_data', JSON.stringify(user, undefined, undefined));
      yield put(getUser());
    } catch (error) {
      console.log(error);
    }
  }
}

function* getUserSaga() {
  try {
    const data = yield call(AsyncStorage.getItem, 'user_data');
    const user = JSON.parse(data);
    yield put(syncUser(user));
  } catch (error) {
    console.log(error);
  }
}

export function* watchUserRequests() {
  yield all([
    takeLatest(types.USER.START_SYNC, syncUserSaga),
    takeLatest(types.USER.GET, getUserSaga),
    takeLatest(types.USER.UPDATE, updateUserSaga),
    takeLatest(types.USER.DELETE, deleteUser),
  ]);
}
