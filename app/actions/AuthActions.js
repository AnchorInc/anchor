import { actionTypes, signinMethods } from '../config';

// starts the login process through google
export const googleLoginRequest = (userType) => {
  return { type: actionTypes.AUTH.LOGIN.GOOGLE, userType, method: signinMethods.GOOGLE };
};

// starts the login process through fb
export const fbLoginRequest = (userType) => {
  return { type: actionTypes.AUTH.LOGIN.FB, userType, method: signinMethods.FB };
};

// action dispatched if the login fails
export const loginFail = () => {
  return { type: actionTypes.AUTH.LOGIN.FAIL };
};

// action dispatched if the login succeeds
export const loginSuccess = () => {
  return { type: actionTypes.AUTH.LOGIN.SUCESS };
};

// action dispatched when the user wants to logout
export const logoutUser = () => {
  return { type: actionTypes.AUTH.LOGOUT.REQUEST };
};

// displays the authenticating spinner while user is logging in
export const showSpinner = () => {
  return { type: actionTypes.AUTH.SHOW_SPINNER };
};
