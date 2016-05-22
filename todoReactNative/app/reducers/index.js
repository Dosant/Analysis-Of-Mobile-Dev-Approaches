import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import app from './app';
import auth from './auth';

const todoApp = combineReducers({
  auth,
  todos,
  visibilityFilter,
  app
});

export default todoApp;
