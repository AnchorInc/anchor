import { all } from 'redux-saga/effects';

import { watchLoginRequests } from './AuthSagas';
import { watchUserRequests } from './UserSagas';

export default function* rootSaga() {
  yield all([
    watchLoginRequests(),
    watchUserRequests(),
  ]);
}
