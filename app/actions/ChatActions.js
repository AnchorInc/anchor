import { actionTypes } from '../config';

export const getMessages = (id) => {
  return { type: actionTypes.CHAT.GET, id };
};

export const updateMessages = (chat, id) => {
  return { type: actionTypes.CHAT.UPDATE, chat, id };
};

export const syncMessages = (messages) => {
  console.log(messages);
  return { type: actionTypes.CHAT.SYNC, messages };
};
