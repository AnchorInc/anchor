import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import { put, takeLatest, all, call, cancel, take } from 'redux-saga/effects';

import { actionTypes } from '../config';
import { syncMessages, syncChats } from '../actions';

function* messageListenerSaga(action) {
  const initialMessages = [];
  const ref = firebase.firestore().collection('conversations').doc(action.id).collection('messages')
                      .orderBy('timeStamp');

  const docs = yield call([ref, ref.get]);
  docs.forEach((doc) => {
    initialMessages.push(doc.data());
  });
  yield put(syncMessages(initialMessages));

  const channel = yield call(messagesEventListener, ref, initialMessages);
  while (firebase.auth().currentUser) {
    const messages = yield take(channel);

    // update the redux store
    yield put(syncMessages(messages));
  }
  channel.close();
}

function* chatListenerSaga() {
  const ref = yield call(getUserRef);
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
}

function* getUserRef() {
  // get the user path string stored on the device
  const userCollection = yield call([AsyncStorage, AsyncStorage.getItem], 'user_collection');
  if (!userCollection) {
      return undefined;
  }
  return firebase.firestore().collection(userCollection).doc(firebase.auth().currentUser.uid);
}

const chatEventListener = (ref) => {
  const channel = eventChannel((emitter) => {
    const chats = [];
    return ref.collection('conversations').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.onSnapshot(chat => chats.push(chat.data()));
      });
      emitter(chats);
    }, null, error => console.log(error));
  });
  return channel;
};

const messagesEventListener = (ref, initialMessages) => {
  const channel = eventChannel((emitter) => {
    const messages = [];
    return ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((message) => {
        if (!initialMessages.some(initialMessage => initialMessage.timeStamp === message.data().timeStamp)) {
          console.log(initialMessages.indexOf(message.data()));
          messages.concat([message.data()]);
        }
      });
      console.log(messages);
      emitter(messages);
    }, null, error => console.log(error));
  });
  return channel;
};

export function* watchChatRequests() {
  yield all([
    takeLatest(actionTypes.MESSAGE.GET, messageListenerSaga),
    takeLatest(actionTypes.MESSAGE.UPDATE, updateMessagesSaga),
    takeLatest(actionTypes.CHAT.GET, chatListenerSaga),
  ]);
}
