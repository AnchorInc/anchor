import { actionTypes } from '../config';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN.SUCESS:
      return { ...state, loading: false };
    case actionTypes.LOGIN.FAIL:
      return { ...state, loading: false };
    case actionTypes.LOGIN.SHOW_SPINNER:
      return { ...state, loading: true };
    default:
      return state;
  }
};
