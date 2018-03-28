import { types, UserTypes } from '../config';

const INITIAL_STATE = {
  user: null,
  type: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER.SYNC:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
