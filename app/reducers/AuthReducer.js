import { types } from '../config';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN.SUCESS:
      return { ...state, loading: false };
    case types.LOGIN.FAIL:
      return { ...state, loading: false };
    case types.LOGIN.SHOW_SPINNER:
      return { ...state, loading: true };
    default:
      return state;
  }
};
