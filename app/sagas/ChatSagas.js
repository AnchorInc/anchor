import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import { put, takeLatest, all, call, select, take } from 'redux-saga/effects';

import { actionTypes } from '../config';
import { syncMessages, getMessages, syncChats } from '../actions';

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

function* getChatsFromChatList() {
  const getChatList = state => state.user.user.chatList;
  const chatList = yield select(getChatList());

  const ref = firebase.firestore().collection('chats');
  const channel = yield call(chatEventListener, ref, chatList);

  while (firebase.auth().currentUser) {
    // get the data emitted from the channel
    const messages = yield take(channel);
    console.log(messages);

    yield put(syncChats());
  }
  channel.close();
}

function* updateMessagesSaga(action) {
  const ref = firebase.firestore().collection('chats').doc(action.id).collection('messages')
  .doc();
  // update the chat doc
  yield call([ref, ref.set], action.chat);
  yield put(getMessages('test'));
}

// ref  = firestore().collections('chats);
const chatEventListener = (ref, chatList) => {
  const channel = eventChannel((emitter) => {
    chatList.forEach((cid) => {
      const messages = [];
      ref.where('cid', '==', cid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          messages.concat(doc.data());
          emitter(messages);
        });
      });
    });
    return () => ref.onSnapshot(() => {});
  });
  return channel;
};

export function* watchChatRequests() {
  yield all([
    takeLatest(actionTypes.MESSAGE.GET, getMessagesSaga),
    takeLatest(actionTypes.MESSAGE.UPDATE, updateMessagesSaga),
    takeLatest(actionTypes.CHAT.GET, getChatsFromChatList),
  ]);
}
