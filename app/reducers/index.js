import { combineReducers } from 'redux';
import GlobalReducer from './GlobalReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  global: GlobalReducer,
  auth: AuthReducer,
});
