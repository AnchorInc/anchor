import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import { actionTypes } from '../config';
import { syncMessages, getMessages } from '../actions';

function* getMessagesSaga() {
  // get all the messages for a chat
  const messages = [];

  const ref = firebase.firestore().collection('chats').doc('test')
              .collection('messages');

  const docs = yield call([ref, ref.get]);
  docs.forEach(doc => messages.push(doc.data()));

  // update the redux store
  yield put(syncMessages(messages));
}

function* updateMessagesSaga(action) {
  const ref = firebase.firestore().collection('chats').doc(action.id).collection('messages')
  .doc();
  // update the chat doc
  yield call([ref, ref.set], action.chat);
  yield put(getMessages('test'));
}

const chatEventListener = (ref) => {
  const channel = eventChannel((emitter) => {
    ref.onSnapshot(doc => emitter(doc.data()));
    return () => ref.onSnapshot(() => {});
  });
  return channel;
};

export function* watchChatRequests() {
  yield all([
    takeLatest(actionTypes.CHAT.GET, getMessagesSaga),
    takeLatest(actionTypes.CHAT.UPDATE, updateMessagesSaga),
  ]);
}
