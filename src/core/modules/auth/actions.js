import { createAction } from 'redux-actions';
import { createPromiseAction } from 'core/utils';

export const LOGIN_REQUEST                      = '@auth/LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS              = '@auth/LOGIN_REQUEST_SUCCESS';

export const CHECK_AUTH                         = '@auth/CHECK_AUTH';
export const CHECK_AUTH_SUCCESS                 = '@auth/CHECK_AUTH_SUCCESS';

export const LOGOUT_REQUEST                     = '@auth/LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS             = '@auth/LOGOUT_REQUEST_SUCCESS';

export const authActionCreators = {
  login: createPromiseAction(LOGIN_REQUEST),
  loginSuccess: createAction(LOGIN_REQUEST_SUCCESS),

  checkAuth: createPromiseAction(CHECK_AUTH),
  checkAuthSuccess: createAction(CHECK_AUTH_SUCCESS),

  logout: createPromiseAction(LOGOUT_REQUEST),
  logoutSuccess: createAction(LOGOUT_REQUEST_SUCCESS),
};
