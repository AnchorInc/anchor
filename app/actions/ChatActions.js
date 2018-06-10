import { actionTypes } from '../config';

export const getChats = () => {
  return { type: actionTypes.CHAT.GET };
};

export const updateChats = (chat, id) => {
  return { type: actionTypes.CHAT.UPDATE, chat, id };
};

export const syncChats = (chats) => {
  return { type: actionTypes.CHAT.SYNC, chats };
};
