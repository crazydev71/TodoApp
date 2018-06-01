import { createAction } from 'redux-actions';
import { createPromiseAction } from 'core/utils';

export const GET_PROJECTS                         = '@project/GET_PROJECTS';
export const GET_PROJECTS_SUCCESS                 = '@project/GET_PROJECTS_SUCCESS';

export const ADD_PROJECT                          = '@project/ADD_PROJECT';
export const ADD_PROJECT_SUCCESS                  = '@project/ADD_PROJECT_SUCCESS';

export const EDIT_PROJECT                        = '@project/EDIT_PROJECT';
export const EDIT_PROJECT_SUCCESS                = '@project/EDIT_PROJECT_SUCCESS';

export const DELETE_PROJECT                       = '@project/DELETE_PROJECT';
export const DELETE_PROJECT_SUCCESS               = '@project/DELETE_PROJECT_SUCCESS';

export const projectsActionCreators = {
  getProjects: createPromiseAction(GET_PROJECTS),
  getProjectsSuccess: createAction(GET_PROJECTS_SUCCESS),

  addProject: createPromiseAction(ADD_PROJECT),
  addProjectSuccess: createAction(ADD_PROJECT_SUCCESS),

  editProject: createPromiseAction(EDIT_PROJECT),
  editProjectSuccess: createAction(EDIT_PROJECT_SUCCESS),

  deleteProject: createPromiseAction(DELETE_PROJECT),
  deleteProjectSuccess: createAction(DELETE_PROJECT_SUCCESS),
};
