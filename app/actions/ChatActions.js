import { actionTypes } from '../config';

export const getMessages = (id) => {
  return { type: actionTypes.MESSAGE.GET, id };
};

export const updateMessages = (chat, id) => {
  return { type: actionTypes.MESSAGE.UPDATE, chat, id };
};

export const syncMessages = (messages) => {
  console.log(messages);
  return { type: actionTypes.MESSAGE.SYNC, messages };
};

export const getChats = () => {
  return { type: actionTypes.CHAT.GET };
};

export const syncChats = (chats) => {
  return { type: actionTypes.CHAT.SYNC, chats };
};
