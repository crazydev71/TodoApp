import { put, call, fork, all, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  projectsActionCreators,
  GET_PROJECTS,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
} from './actions';

export function* asyncGetProjects({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    let projects = localStorage.getItem('projects');

    projects = projects ? JSON.parse(projects) : [];

    if (projects) {
      yield put(projectsActionCreators.getProjectsSuccess(projects));

      resolve(projects);
    } else {
      reject({
        error: "Can't find your project"
      });
    }
  } catch (error) {
    reject(error || {});
  }
}

export function* asyncAddProject({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    const { title, description } = payload;

    // Check title is valid and less than 140 characters
    if (title && title.length && title.length <= 140) {
      let projects = localStorage.getItem('projects');

      projects = projects ? JSON.parse(projects) : [];

      projects.push({ title, description });

      localStorage.setItem('projects', JSON.stringify(projects));
      
      yield put(projectsActionCreators.addProjectSuccess({ title, description }));

      resolve({ title, description });
    } else {
      reject({
        message: 'Invalid parameters'
      });
    }
  } catch (error) {
    reject(error || {});
  }
}

export function* asyncEditProject({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    const { id, title, description } = payload;

    let projects = localStorage.getItem('projects');

    projects = projects ? JSON.parse(projects) : [];

    // Validate parameters
    if (0 <= id && id < projects.length && title && title.length && title.length <= 140) {
      projects[id] = { title, description };

      localStorage.setItem('projects', JSON.stringify(projects));

      yield put(projectsActionCreators.editProjectSuccess({id, title, description }));

      resolve({id, title, description });
    } else {
      reject({
        message: 'Invalid parameters'
      });
    }
  } catch (error) {
    reject(error || {});
  }
}


export function* asyncDeleteProject({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    const { id } = payload;

    let projects = localStorage.getItem('projects');

    projects = projects ? JSON.parse(projects) : [];

    // Validate parameters
    if (0 <= id && id < projects.length) {
      projects.splice(id, 1);

      localStorage.setItem('projects', JSON.stringify(projects));

      yield put(projectsActionCreators.deleteProjectSuccess({ id }));

      resolve({ id });
    } else {
      reject({
        message: 'Invalid parameters'
      });
    }
  } catch (error) {
    reject(error || {});
  }
}

export function* watchGetProjects() {
  while (true) {
    const action = yield take(GET_PROJECTS);
    yield* asyncGetProjects(action);
  }
}

export function* watchAddProject() {
  while (true) {
    const action = yield take(ADD_PROJECT);
    yield* asyncAddProject(action);
  }
}

export function* watchEditProject() {
  while (true) {
    const action = yield take(EDIT_PROJECT);
    yield* asyncEditProject(action);
  }
}

export function* watchDeleteProject() {
  while (true) {
    const action = yield take(DELETE_PROJECT);
    yield* asyncDeleteProject(action);
  }
}

export default function* () {
  yield all([
    fork(watchGetProjects),
    fork(watchAddProject),
    fork(watchEditProject),
    fork(watchDeleteProject),
  ]);
}
