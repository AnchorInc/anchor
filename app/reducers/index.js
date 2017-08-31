import { combineReducers } from 'redux';
import GlobalReducer from './GlobalReducer';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  global: GlobalReducer,
  auth: AuthReducer,
  user: UserReducer,
});
