import { types } from '../config';

export const googleLoginRequest = (userType) => {
  return { type: types.LOGIN.GOOGLE, userType };
};

export const fbLoginRequest = (userType) => {
  return { type: types.LOGIN.FB, userType };
};

export const loginUserFail = () => {
  return { type: types.LOGIN.FAIL };
};

export const loginUserSuccess = () => {
  return { type: types.LOGIN.SUCESS };
};

export const showSpinner = () => {
  return { type: types.LOGIN.SHOW_SPINNER };
};
