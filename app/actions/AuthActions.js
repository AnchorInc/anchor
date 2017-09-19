import { types } from '../config';

export const googleLoginRequest = () => {
  return { type: types.LOGIN.GOOGLE };
};

export const fbLoginRequest = () => {
  return { type: types.LOGIN.FB };
};

export const loginUserFail = (error) => {
  return { type: types.LOGIN.FAIL, payload: error };
};

export const loginUserSuccess = () => {
  return { type: types.LOGIN.SUCESS };
};

export const showSpinner = () => {
  return { type: types.LOGIN.SHOW_SPINNER };
};
