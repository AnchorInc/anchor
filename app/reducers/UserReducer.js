import { actionTypes } from '../config';

const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
	//console.log(action);
  switch (action.type) {
    case actionTypes.USER.SYNC:
    	console.log(100);
      return { ...state, user: action.user };
    default:
      return state;
  }
};
