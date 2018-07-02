import { actionTypes } from '../config';

export const getMessages = (teacherUID, studentUID) => {
  return { type: actionTypes.MESSAGE.GET, teacherUID, studentUID };
};

export const updateMessages = (chat, teacherUID, studentUID) => {
  return { type: actionTypes.MESSAGE.UPDATE, chat, teacherUID, studentUID };
};

export const syncMessages = (messages) => {
  return { type: actionTypes.MESSAGE.SYNC, messages };
};

export const getChats = (id) => {
  return { type: actionTypes.CHAT.GET, id };
};

export const syncChats = (chats) => {
  return { type: actionTypes.CHAT.SYNC, chats };
};

export const createChat = () => {
  return { type: actionTypes.CHAT.CREATE };
};
