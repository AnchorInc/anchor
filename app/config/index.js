// colors
export const STATUS_BAR_COLOR = '#0d2338';
export const MAIN_COLOR = '#102c46';
export const ACCENT_COLOR = '#8b2b2b';
export const LIGHT_GRAY = '#d5d5d5';
export const DARK_GRAY = '#333';
export const BOTTOM_BAR_ICON_NORMAL = 'white';
export const BOTTOM_BAR_ICON_FOCUSED = '#b73535';
export const BOTTOM_BAR_COLOR = MAIN_COLOR;

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
    SETUP: 'types,USER.SETUP',
    SYNC_SETUP: 'types.USER.SYNC_SETUP',
  },
};
