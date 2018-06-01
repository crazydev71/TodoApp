import { combineReducers } from 'redux';

import {
  auth,
  projects,
  tasks,
} from '../modules';

const rootReducer = combineReducers({
  auth,
  projects,
  tasks,
});

export default rootReducer;
