import {
  SEND_USER_PROFILE,
} from '../config';

const INITIAL_STATE = {
  profile: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_USER_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
