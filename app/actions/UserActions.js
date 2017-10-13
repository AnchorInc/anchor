import { types } from '../config';

export const startSyncUser = () => {
  return { type: types.USER.START_SYNC };
};

export const syncUser = (user) => {
  console.log(user);
  return { type: types.USER.SYNC, user };
};

export const updateUser = (payload) => {
  return { type: types.USER.UPDATE, payload };
};

export const deleteUser = () => {
  return { type: types.USER.DELETE };
};

export const getUser = () => {
  return { type: types.USER.GET };
};
