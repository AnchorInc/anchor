import {
  CLOSE_ERROR_MESSAGE,
  SHOW_ERROR_MESSAGE,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  SEND_USER_PROFILE,
} from '../config';

export * from './AuthActions';

export const showErrorMessage = (payload) => {
  return { type: SHOW_ERROR_MESSAGE, payload };
};

export const closeErrorMessage = () => {
  return { type: CLOSE_ERROR_MESSAGE };
};

export const sendUserProfile = (payload) => {
  return { type: SEND_USER_PROFILE, payload };
}

export const getUserProfile = () => {
  return { type: GET_USER_PROFILE };
};

export const updateUserProfile = (payload) => {
  return { type: UPDATE_USER_PROFILE, payload };
};
