// action types used in the app
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
    START_FCM_TOKEN_LISTENER: 'types.USER.STAR_FCM_TOKEN_LISTENER',
  },
  CHAT: {
    SYNC: 'types.CHAT.SYNC',
    GET: 'types.CHAT.GET',
    UPDATE: 'types.CHAT.UPDATE',
    CREATE: 'types.CHAT.CREATE',
    DELETE: 'types.CHAT.DELETE',
  },
  MESSAGE: {
    GET: 'types.MESSAGE.GET',
    UPDATE: 'types.MESSAGE.UPDATE',
    SYNC: 'types.MESSAGE.SYNC',
  },
};

// user types used by auth
export const userTypes = {
  STUDENT: 'student',
  TEACHER: 'teacher',
};

// algoliasearch config data
export const algoliaConfig = {
  adminID: 'HZZZN58AJ0',
  apiKey: 'fd2e8b88f354f7b81eced75ff5991de5',
};

// google signin configdata
export const gsigninConfig = {
  webClientId: '489771714033-ej9vlft4gfm6enq8fsosh135vac9vnu7.apps.googleusercontent.com',
};

// sign in methods
export const signinMethods = {
  GOOGLE: 'google',
  FB: 'fb',
};

// firebase database constants
export const firebasePaths = {
  STUDENTS: 'students',
  TEACHERS: 'teachers',
};
