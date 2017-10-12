import { types } from '../config';

const INITIAL_STATE = {
  user: null,
  donePref: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER.SYNC:
      return { ...state, user: action.user };
    case types.USER.SYNC_SETUP:
      return { ...state, donePref: action.data };
    default:
      return state;
  }
};
