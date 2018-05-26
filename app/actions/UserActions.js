import { actionTypes } from '../config';

// starts the user event listener in UserSagas.js
export const startSyncUser = () => {
	console.log("startSyncUser");
  return { type: actionTypes.USER.START_SYNC };
};

// syncs the local user data with the cloud user data
export const syncUser = (user) => {
	console.log("syncUser");
  return { type: actionTypes.USER.SYNC, user };
};

// updates the user data in the cloud
export const updateUser = (user) => {
	console.log("updateUser");
  return { type: actionTypes.USER.UPDATE, user };
};

// gets the local user data and stores in the user reducer
export const getUser = () => {
	console.log("getUser");
  return { type: actionTypes.USER.GET };
};
