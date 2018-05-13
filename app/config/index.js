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
  },
};

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
    GET_TYPE: 'types.USER.GET_TYPE',
  },
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
