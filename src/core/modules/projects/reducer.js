import {
  GET_PROJECTS_SUCCESS,
  ADD_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,

} from './actions';

import { initialState } from '../initialState';

export default function projects(state = initialState.projects, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS_SUCCESS:
      return payload;

    case ADD_PROJECT_SUCCESS:
      return [...state, payload];

    case EDIT_PROJECT_SUCCESS:
      state[payload.id] = {
        title: payload.title,
        description: payload.description
      };
      return [...state];

    case DELETE_PROJECT_SUCCESS:
      state.splice(payload.id, 1);

      return [...state];

    default: {
      return state;
    }
  }
}
