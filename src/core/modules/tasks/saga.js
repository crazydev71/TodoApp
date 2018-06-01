import { put, call, fork, all, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  tasksActionCreators,
  GET_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
} from './actions';

export function* asyncGetTasks({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    let tasks = localStorage.getItem('tasks');

    tasks = tasks ? JSON.parse(tasks) : [];

    if (tasks) {
      yield put(tasksActionCreators.getTasksSuccess(tasks));

      resolve(tasks);
    } else {
      reject({
        error: "Can't find your task"
      });
    }
  } catch (error) {
    reject(error || {});
  }
}

export function* asyncAddTask({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    const { title, description } = payload;

    // Check title is valid and less than 140 characters
    if (title && title.length && title.length <= 140) {
      let tasks = localStorage.getItem('tasks');

      tasks = tasks ? JSON.parse(tasks) : [];

      tasks.push({ title, description });

      localStorage.setItem('tasks', JSON.stringify(tasks));
      
      yield put(tasksActionCreators.addTaskSuccess({ title, description }));

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

export function* asyncEditTask({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    const { id, title, description } = payload;

    let tasks = localStorage.getItem('tasks');

    tasks = tasks ? JSON.parse(tasks) : [];

    // Validate parameters
    if (0 <= id && id < tasks.length && title && title.length && title.length <= 140) {
      tasks[id] = { title, description };

      localStorage.setItem('tasks', JSON.stringify(tasks));

      yield put(tasksActionCreators.editTaskSuccess({id, title, description }));

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


export function* asyncDeleteTask({ payload, resolve, reject }) {
  try {
    // Simulate api call by delaying 500ms
    yield call(delay, 1000);

    const { id } = payload;

    let tasks = localStorage.getItem('tasks');

    tasks = tasks ? JSON.parse(tasks) : [];

    // Validate parameters
    if (0 <= id && id < tasks.length) {
      tasks.splice(id, 1);

      localStorage.setItem('tasks', JSON.stringify(tasks));

      yield put(tasksActionCreators.deleteTaskSuccess({ id }));

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

export function* watchGetTasks() {
  while (true) {
    const action = yield take(GET_TASKS);
    yield* asyncGetTasks(action);
  }
}

export function* watchAddTask() {
  while (true) {
    const action = yield take(ADD_TASK);
    yield* asyncAddTask(action);
  }
}

export function* watchEditTask() {
  while (true) {
    const action = yield take(EDIT_TASK);
    yield* asyncEditTask(action);
  }
}

export function* watchDeleteTask() {
  while (true) {
    const action = yield take(DELETE_TASK);
    yield* asyncDeleteTask(action);
  }
}

export default function* () {
  yield all([
    fork(watchGetTasks),
    fork(watchAddTask),
    fork(watchEditTask),
    fork(watchDeleteTask),
  ]);
}
