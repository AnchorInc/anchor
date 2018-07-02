import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import { put, takeLatest, all, call, cancel, take, takeEvery, select } from 'redux-saga/effects';

import { actionTypes, userTypes } from '../config';
import { syncMessages, syncChats, createChat } from '../actions';

function* messageListenerSaga(action) {
  const ref = yield call(getChatRef, action);

  const channel = yield call(messagesEventListener, ref);
  while (firebase.auth().currentUser) {
    const messages = yield take(channel);

    // if (!messages) {
    //   yield put(createChat(action));
    // }

    // update the redux store
    yield put(syncMessages(messages));
  }
  channel.close();
}

function* chatListenerSaga(action) {
  const ref = firebase.firestore();
  if (!ref) yield cancel();

  const getUserType = state => state.user.user.type;
  const userType = yield select(getUserType);

  const channel = yield call(chatEventListener, ref, action.id, userType);

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

const chatEventListener = (ref, id, type) => {
  const channel = eventChannel((emitter) => {
    const chats = [];

    const idType = (type === userTypes.STUDENT) ? 'studentId' : 'teacherId';

    return ref.collection('conversations')
    .where(idType, '==', id)
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
      snapshot.docChanges.forEach((change) => {
        messages.concat(change.doc.data());
      });
      console.log(messages);
      emitter(messages);
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
