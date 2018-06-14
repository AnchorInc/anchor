import { actionTypes } from '../config';

export * from './AuthActions';
export * from './UserActions';
export * from './ChatActions';

export const showErrorMessage = (payload) => {
  return { type: actionTypes.ERROR.SHOW, payload };
};

export const closeErrorMessage = () => {
  return { type: actionTypes.ERROR.CLOSE };
};
