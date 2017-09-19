import { types } from '../config';

const INITIAL_STATE = {
  user: null,
  donePref: false,
  photoURL: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER.SYNC:
      return { ...state, user: action.user };
    case types.USER.SYNC_SETUP:
      return { ...state, user: action.user, donePref: action.setupData.donePref, photoURL: action.setupData.photoURL };
    default:
      return state;
  }
};
