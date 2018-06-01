// @flow

import { fork, all } from 'redux-saga/effects';
import {
  authSaga,
  projectsSaga,
  tasksSaga,
  
} from '../modules';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(projectsSaga),
    fork(tasksSaga),
  ]);
}
