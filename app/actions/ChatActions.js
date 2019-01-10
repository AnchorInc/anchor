import { actionTypes } from '../config';

export const getMessages = (teacherUID) => {
  return { type: actionTypes.MESSAGE.GET, teacherUID };
};

export const updateMessages = (chat, teacherUID) => {
  return { type: actionTypes.MESSAGE.UPDATE, chat, teacherUID };
};

export const syncMessages = (messages) => {
  return { type: actionTypes.MESSAGE.SYNC, messages };
};

export const getChats = () => {
  return { type: actionTypes.CHAT.GET };
};

export const syncChats = (chats) => {
  return { type: actionTypes.CHAT.SYNC, chats };
};

export const createChat = (action) => {
  return { type: actionTypes.CHAT.CREATE, action };
};

export const deleteChat = (teacherUID) => {
  return { type: actionTypes.CHAT.DELETE, teacherUID };
};
