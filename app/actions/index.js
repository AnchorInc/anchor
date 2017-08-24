import {
  CLOSE_ERROR_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from '../config';

export * from './AuthActions';

export const showErrorMessage = (payload) => {
  return {
    type: SHOW_ERROR_MESSAGE,
    payload,
  };
};

export const closeErrorMessage = () => {
  return { type: CLOSE_ERROR_MESSAGE };
};
