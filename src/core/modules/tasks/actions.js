import { createAction } from 'redux-actions';
import { createPromiseAction } from 'core/utils';

export const GET_TASKS                         = '@task/GET_TASKS';
export const GET_TASKS_SUCCESS                 = '@task/GET_TASKS_SUCCESS';

export const ADD_TASK                          = '@task/ADD_TASK';
export const ADD_TASK_SUCCESS                  = '@task/ADD_TASK_SUCCESS';

export const EDIT_TASK                        = '@task/EDIT_TASK';
export const EDIT_TASK_SUCCESS                = '@task/EDIT_TASK_SUCCESS';

export const DELETE_TASK                       = '@task/DELETE_TASK';
export const DELETE_TASK_SUCCESS               = '@task/DELETE_TASK_SUCCESS';

export const tasksActionCreators = {
  getTasks: createPromiseAction(GET_TASKS),
  getTasksSuccess: createAction(GET_TASKS_SUCCESS),

  addTask: createPromiseAction(ADD_TASK),
  addTaskSuccess: createAction(ADD_TASK_SUCCESS),

  editTask: createPromiseAction(EDIT_TASK),
  editTaskSuccess: createAction(EDIT_TASK_SUCCESS),

  deleteTask: createPromiseAction(DELETE_TASK),
  deleteTaskSuccess: createAction(DELETE_TASK_SUCCESS),
};
