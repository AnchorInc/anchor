import { GOOGLE_LOGIN_REQUEST, FB_LOGIN_REQUEST, CLOSE_ERROR_MESSAGE, SHOW_ERROR_MESSAGE } from '../config';

export const googleLoginRequest = () => {
  return {
    type: GOOGLE_LOGIN_REQUEST,
  };
};

export const fbLoginRequest = () => {
  return {
    type: FB_LOGIN_REQUEST,
  };
};

export const showErrorMessage = (payload) => {
  return {
    type: SHOW_ERROR_MESSAGE,
    payload,
  };
};

export const closeErrorMessage = () => {
  return {
    type: CLOSE_ERROR_MESSAGE,
  };
};
