import { actionTypes } from '../config';

// starts the login process through google
export const googleLoginRequest = (userType) => {
  return { type: actionTypes.AUTH.LOGIN.GOOGLE, userType };
};

// starts the login process through fb
export const fbLoginRequest = (userType) => {
  return { type: actionTypes.AUTH.LOGIN.FB, userType };
};

// action dispatched if the login fails
export const loginFail = () => {
  return { type: actionTypes.AUTH.LOGIN.FAIL };
};

// action dispatched if the login succeeds
export const loginSuccess = () => {
  return { type: actionTypes.AUTH.LOGIN.SUCESS };
};

// displays the authenticating spinner while user is logging in
export const showSpinner = () => {
  return { type: actionTypes.AUTH.SHOW_SPINNER };
};
