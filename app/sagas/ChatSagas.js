import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import { put, takeLatest, all, call, cancel, take } from 'redux-saga/effects';

import { actionTypes } from '../config';
import { syncMessages, getMessages, syncChats } from '../actions';

function* getMessagesSaga() {
  // get all the messages for a chat
  const messages = [];

  const ref = firebase.firestore().collection('conversations').doc('SDjf09n23rjDSA0FAjs')
              .collection('messages')
              .orderBy('timeStamp');

  const docs = yield call([ref, ref.get]);
  docs.forEach((doc) => {
    messages.push(doc.data());
  });

  // update the redux store
  yield put(syncMessages(messages));
}

function* chatListenerSaga() {
  const ref = firebase.firestore();
  if (!ref) yield cancel();

  const channel = yield call(chatEventListener, ref);

  while (firebase.auth().currentUser) {
    // get the data emitted from the channel
    const chats = yield take(channel);

    yield put(syncChats(chats));
  }
  channel.close();
}

function* updateMessagesSaga(action) {
  const ref = firebase.firestore().collection('conversations').doc(action.id).collection('messages')
  .doc();
  // update the chat doc
  yield call([ref, ref.set], action.chat);
  yield put(getMessages());
}

const chatEventListener = (ref) => {
  const channel = eventChannel((emitter) => {
    const chats = [];

    return ref.collection('conversations')
    .onSnapshot((snapshot) => {
      snapshot.docChanges.forEach((change) => {
        chats.push(change.doc.data());
      });
      emitter(chats);
    });
  });
  return channel;
};

// const messagesEventListener = (ref) => {
//   const channel = eventChannel((emitter) => {
//     const messages = [];
//     return ref.collection('conversations').doc('SDjf09n23rjDSA0FAjs').collection('messages')
//               .onSnapshot()
//   }
// }

export function* watchChatRequests() {
  yield all([
    takeLatest(actionTypes.MESSAGE.GET, getMessagesSaga),
    takeLatest(actionTypes.MESSAGE.UPDATE, updateMessagesSaga),
    takeLatest(actionTypes.CHAT.GET, chatListenerSaga),
  ]);
}
