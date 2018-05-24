import { actionTypes } from '../config';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.AUTH.LOGIN.SUCESS:
      return { ...state, loading: false };
    case actionTypes.AUTH.LOGIN.FAIL:
      return { ...state, loading: false };
    case actionTypes.AUTH.SHOW_SPINNER:
      return { ...state, loading: true };
    default:
      return state;
  }
};
