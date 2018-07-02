import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import { put, takeLatest, all, call, cancel, take, takeEvery } from 'redux-saga/effects';

import { actionTypes } from '../config';
import { syncMessages, syncChats, createChat } from '../actions';

function* messageListenerSaga(action) {
  const ref = yield call(getChatRef, action);

  const channel = yield call(messagesEventListener, ref);
  while (firebase.auth().currentUser) {
    const messages = yield take(channel);

    if (!messages) {
      yield put(createChat(action));
    }

    // update the redux store
    yield put(syncMessages(messages));
  }
  channel.close();
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

function* createChatSaga(action) {
  const ref = firebase.firestore().collection('conversations');

  yield call([ref, ref.add], { teacherId: action.teacherUID, studentId: action.studentId });
}

function* updateMessagesSaga(action) {
  const ref = firebase.firestore().collection('conversations').doc(action.id).collection('messages')
  .doc();
  // update the chat docs
  yield call([ref, ref.set], action.chat);
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

const messagesEventListener = (ref) => {
  const channel = eventChannel((emitter) => {
    const messages = [];

    return ref.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        snapshot.docChanges.forEach((change) => {
          messages.concat(change.doc.data());
          console.log(messages);
          emitter(messages);
        });
      } else {
        emitter(false);
      }
    });
  });
  return channel;
};

const getChatRef = (action) => {
  let chatId;

  firebase.firestore().collection('conversations')
  .where('teacherId', '==', action.teacherUID)
  .where('studentId', '==', action.studentUID)
  .get()
  .then((doc) => {
    doc.forEach((chat) => {
      console.log(chat);
      chatId = chat;
    });
  });

  return firebase.firestore().collection('conversations').doc(chatId).collection('messages')
  .orderBy('timeStamp');
};

export function* watchChatRequests() {
  yield all([
    takeLatest(actionTypes.MESSAGE.GET, messageListenerSaga),
    takeEvery(actionTypes.MESSAGE.UPDATE, updateMessagesSaga),
    takeLatest(actionTypes.CHAT.GET, chatListenerSaga),
    takeEvery(actionTypes.CHAT.CREATE, createChatSaga),
  ]);
}
