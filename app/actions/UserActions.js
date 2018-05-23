import { actionTypes } from '../config';

export const startSyncUser = () => {
  return { type: actionTypes.USER.START_SYNC };
};

export const syncUser = (user) => {
  console.log(user);
  return { type: actionTypes.USER.SYNC, user };
};

export const updateUser = (user) => {
  return { type: actionTypes.USER.UPDATE, user };
};

export const deleteUser = () => {
  return { type: actionTypes.USER.DELETE };
};

export const getUser = () => {
  return { type: actionTypes.USER.GET };
};
