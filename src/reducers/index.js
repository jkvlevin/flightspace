import {routerReducer} from 'react-router-redux';
import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import markuptoolReducer from './markuptoolReducer';

const rootReducer = combineReducers({
  mapReducer,
  markuptoolReducer,
  routing: routerReducer
});
export default rootReducer;
