import { types } from '../config';

export * from './AuthActions';
export * from './UserActions';

export const showErrorMessage = (payload) => {
  return { type: types.ERROR.SHOW, payload };
};

export const closeErrorMessage = () => {
  return { type: types.ERROR.CLOSE };
};
