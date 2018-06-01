import { put, call, fork, all, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { generateToken } from 'core/utils';

import {
  authActionCreators,
  LOGIN_REQUEST,
  CHECK_AUTH,
  LOGOUT_REQUEST,
} from './actions';

const USERNAME = 'hedgieadmin';
const PASSWORD = 'pass1234';

export function* asyncLogin({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    const { username, password } = payload;

    // Fake check of username and password here
    if (username === USERNAME && password === PASSWORD) {
      const token = generateToken(20);

      // Save token to local storage
      localStorage.setItem('token', token);

      /**
       * Save user with token for validation of authentication
       * This should be done in backend side,
       * but just save it in local storage for demo purpose
       */
       
      localStorage.setItem(token, username);

      yield put(authActionCreators.loginSuccess({ username }));

      resolve({ username });
    } else {
      reject({
        message: 'Invalid Username and Password'
      });
    }
  } catch (error) {
    reject(error || {});
  }
}

export function* asyncCheckAuth({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    // Fake check of access token
    const token = localStorage.getItem('token');

    if (token) {
      const username = localStorage.getItem(token);

      if (username) {
        yield put(authActionCreators.checkAuthSuccess({ username }));
        resolve({ username });
      } else {
        reject({
          message: 'Invalid access token'
        });
      }
      
    } else {
      reject({
        message: 'No token provided'
      });
    }
  } catch (error) {
    reject(error || {});
  }
}

export function* asyncLogout({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    // Remove access token
    const token = localStorage.getItem('token');
    if (token) {

      localStorage.removeItem(token);
      localStorage.removeItem('token');
      
      yield put(authActionCreators.logoutSuccess({}));
      resolve({});
      
    } else {
      reject({
        message: 'No token provided'
      });
    }
  } catch (error) {
    reject(error || {});
  }
}

export function* watchLogin() {
  while (true) {
    const action = yield take(LOGIN_REQUEST);
    yield* asyncLogin(action);
  }
}

export function* watchCheckAuth() {
  while (true) {
    const action = yield take(CHECK_AUTH);
    yield* asyncCheckAuth(action);
  }
}

export function* watchLogout() {
  while (true) {
    const action = yield take(LOGOUT_REQUEST);
    yield* asyncLogout(action);
  }
}

export default function* () {
  yield all([
    fork(watchLogin),
    fork(watchCheckAuth),
    fork(watchLogout),
  ]);
}
