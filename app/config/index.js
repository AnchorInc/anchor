// colors
export const STATUS_BAR_COLOR = '#000a2a';
export const MAIN_COLOR = '#000e3b';
export const ACCENT_COLOR = '#bf3b3b';
export const LIGHT_GRAY = '#d5d5d5';
export const DARK_GRAY = '#333';
export const BOTTOM_BAR_ICON_NORMAL = '#858585';
export const BOTTOM_BAR_ICON_FOCUSED = MAIN_COLOR;
export const BOTTOM_BAR_COLOR = '#dfdfdf';

// action types
export const types = {
  LOGIN: {
    GOOGLE: 'types.LOGIN.GOOGLE',
    FB: 'types.LOGIN.FB',
    SUCESS: 'types.LOGIN.SUCCESS',
    FAIL: 'types.LOGIN.FAIL',
    SHOW_SPINNER: 'types.LOGIN.SHOW_SPINNER',
  },
  ERROR: {
    SHOW: 'types.ERROR.SHOW',
    CLOSE: 'types.ERROR.CLOSE',
  },
  USER: {
    SYNC: 'types.USER.SYNC',
    UPDATE: 'types.USER.UPDATE',
    DELETE: 'types.USER.DELETE',
    GET: 'types.USER.GET',
    SETUP: 'types.USER.SETUP',
    SYNC_SETUP: 'types.USER.SYNC_SETUP',
  },
};
