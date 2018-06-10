import { actionTypes } from '../config';

const INITIAL_STATE = {
  chats: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action) {
    case (actionTypes.CHAT.SYNC):
      return { ...state, chats: action.chats };
    default:
      return { ...state };
  }
};
