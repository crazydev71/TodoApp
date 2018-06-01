import {
  GET_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,

} from './actions';

import { initialState } from '../initialState';

export default function tasks(state = initialState.tasks, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS_SUCCESS:
      return payload;

    case ADD_TASK_SUCCESS:
      return [...state, payload];

    case EDIT_TASK_SUCCESS:
      state[payload.id] = {
        title: payload.title,
        description: payload.description
      };
      return [...state];

    case DELETE_TASK_SUCCESS:
      state.splice(payload.id, 1);

      return [...state];

    default: {
      return state;
    }
  }
}
