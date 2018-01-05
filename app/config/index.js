// colors
export const STATUS_BAR_COLOR = '#004FF4';
export const MAIN_COLOR = '#0065F4';
export const ACCENT_COLOR_RED = '#F63119';
export const LIGHT_GRAY = '#dbdbdb';
export const DARK_GRAY = '#333';
export const BOTTOM_BAR_ICON_NORMAL = '#858585';
export const BOTTOM_BAR_ICON_FOCUSED = MAIN_COLOR;
export const BOTTOM_BAR_COLOR = '#dfdfdf';
export const BACKGROUND_COLOR = '#e9e9ef';

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
    START_SYNC: 'types.USER.SYNC',
    UPDATE: 'types.USER.UPDATE',
    DELETE: 'types.USER.DELETE',
    GET: 'types.USER.GET',
  },
};
