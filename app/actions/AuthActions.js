import { actionTypes } from '../config';

export const googleLoginRequest = (userType) => {
  return { type: actionTypes.LOGIN.GOOGLE, userType };
};

export const fbLoginRequest = (userType) => {
  return { type: actionTypes.LOGIN.FB, userType };
};

export const loginUserFail = () => {
  return { type: actionTypes.LOGIN.FAIL };
};

export const loginUserSuccess = () => {
  return { type: actionTypes.LOGIN.SUCESS };
};

export const showSpinner = () => {
  return { type: actionTypes.LOGIN.SHOW_SPINNER };
};
