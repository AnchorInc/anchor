import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  START_AUTH,
  GOOGLE_LOGIN_REQUEST,
  FB_LOGIN_REQUEST,
} from '../config';

export const googleLoginRequest = () => {
  return { type: GOOGLE_LOGIN_REQUEST };
};

export const fbLoginRequest = () => {
  return { type: FB_LOGIN_REQUEST };
};

export const loginUserFail = (error) => {
  return { type: LOGIN_USER_FAIL, payload: error };
};

export const loginUserSuccess = () => {
  return { type: LOGIN_USER_SUCCESS };
};

export const startAuth = () => {
  return { type: START_AUTH };
};
