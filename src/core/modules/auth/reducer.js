import {
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST_SUCCESS,
  CHECK_AUTH_SUCCESS,
} from './actions';

import { initialState } from '../initialState';

export default function auth(state = initialState.auth, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST_SUCCESS:
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          username: payload.username
        }
      };

    case LOGOUT_REQUEST_SUCCESS: 
      return {
        ...state,
        isAuthenticated: false,
        user: undefined
      }; 
    default: {
      return state;
    }
  }
}
