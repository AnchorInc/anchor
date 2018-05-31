// colors
export const colors = {
  primary: {
    normal: '#1a237e',
    light: '#534bae',
    dark: '#000051',
  },
  secondary: {
    normal: '#e91e63',
    light: '#ff6090',
    dark: '#b0003a',
  },
  other: {
    bbIconNormal: '#858585',
    bbNormal: '#dfdfdf',
    bgColor: '#e9e9ef',
    darkGray: '#515151',
  },
};

// action types
export const actionTypes = {
  AUTH: {
    LOGIN: {
      GOOGLE: 'types.AUTH.LOGIN.GOOGLE',
      FB: 'types.AUTH.LOGIN.FB',
      SUCESS: 'types.AUTH.LOGIN.SUCCESS',
      FAIL: 'types.AUTH.LOGIN.FAIL',
      RESET: 'types.AUTH.LOGIN.RESET',
    },
    LOGOUT: {
      REQUEST: 'types.AUTH.LOGOUT',
      SUCCESS: 'types.AUTH.LOGOUT.SUCCESS',
      FAIL: 'types.AUTH.LOGOUT.FAIL',
    },
    SHOW_SPINNER: 'types.LOGIN.SHOW_SPINNER',
  },
  ERROR: {
    SHOW: 'types.ERROR.SHOW',
    CLOSE: 'types.ERROR.CLOSE',
  },
  USER: {
    SYNC: 'types.USER.SYNC',
    LISTEN: 'types.USER.LISTEN',
    UPDATE: 'types.USER.UPDATE',
    GET: 'types.USER.GET',
  },
};

// sign in methods
export const signinMethods = {
  GOOGLE: 'google',
  FB: 'fb',
};

// user types
export const userTypes = {
  STUDENT: 'student',
  TEACHER: 'teacher',
};

// firebase database constants
export const firebasePaths = {
  STUDENTS: '/users/students/',
  TEACHERS: '/users/teachers/',
};

// algoliasearch config data
export const algoliaConfig = {
  adminID: 'HZZZN58AJ0',
  apiKey: 'fd2e8b88f354f7b81eced75ff5991de5',
};

// google signin configure
export const gsigninConfig = {
  webClientId: '489771714033-ej9vlft4gfm6enq8fsosh135vac9vnu7.apps.googleusercontent.com',
};
