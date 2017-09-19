import { types } from '../config';

const INITIAL_STATE = {
  error: false,
  errorMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ERROR.SHOW:
      return { ...state, error: true, errorMessage: action.payload };
    case types.ERROR.CLOSE:
      return { ...state, error: false, errorMessage: null };
    default:
      return state;
  }
};
