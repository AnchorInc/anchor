import firebase from 'react-native-firebase';
import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import { actionTypes } from '../config';
import { syncChats } from '../actions';

function* getChats() {
  // get the user's chat list
  const getUserChatList = state => state.user.user.chatList;
  const chatList = yield select(getUserChatList);

  // get all the chats from the firestore doc
  const chats = {};

  chatList.map((id) => {
    return firebase.firestore().collection('chats').doc(id).get()
    .then((doc) => {
      chats[id] = doc.data();
    });
  });

  console.log(chats);

  // update the redux store
  yield put(syncChats(chats));
}

function* updateChat(action) {
  // get user name
  const getUserName = state => state.user.user.displayName;
  const displayName = yield select(getUserName);

  const ref = firebase.firestore().collection('chats').doc(action.id);
   // create message object to push to the cloud
  const message = {
    text: action.chat.message,
    timeStamp: action.chat.timeStamp,
    id: action.chat.id,
    user: {
      displayName,
    },
  };
  // update the chat doc
  yield call([ref, ref.update], message);
}

export function* watchLoginRequests() {
  yield all([
    takeLatest(actionTypes.CHAT.GET, getChats),
    takeLatest(actionTypes.CHAT.UPDATE, updateChat),
  ]);
}
