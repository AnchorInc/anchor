import { actionTypes } from '../config';

// sets the show error dialog box state variable true
export const showErrorMessage = (payload) => {
  return { type: actionTypes.ERROR.SHOW, payload };
};

// sets the show error dialog box state variable false
export const closeErrorMessage = () => {
  return { type: actionTypes.ERROR.CLOSE };
};

// toggled the chat badge on the main screen on
export const showChatBadge = () => {
  return { type: actionTypes.BADGE.SHOW };
};

// toggled the chat badge on the main screen off
export const hideChatBadge = () => {
  return { type: actionTypes.BADGE.HIDE };
};
