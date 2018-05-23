import { actionTypes } from '../config';

const INITIAL_STATE = {
  error: false,
  errorMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ERROR.SHOW:
      return { ...state, error: true, errorMessage: action.payload };
    case actionTypes.ERROR.CLOSE:
      return { ...state, error: false, errorMessage: null };
    default:
      return state;
  }
};
