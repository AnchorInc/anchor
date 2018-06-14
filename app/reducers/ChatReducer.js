import { actionTypes } from '../config';

const INITIAL_STATE = {
  chats: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case (actionTypes.CHAT.SYNC):
      return { ...state, chats: action.messages };
    default:
      return { ...state };
  }
};
