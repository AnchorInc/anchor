import { AsyncStorage } from 'react-native';
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
  yield put(getMessages());
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
        chats.push(doc.data());
      });
      emitter(chats);
    }, null, error => console.log(error));
  });
  return channel;
};

export function* watchChatRequests() {
  yield all([
    takeLatest(actionTypes.MESSAGE.GET, getMessagesSaga),
    takeLatest(actionTypes.MESSAGE.UPDATE, updateMessagesSaga),
    takeLatest(actionTypes.CHAT.GET, chatListenerSaga),
  ]);
}
