import {routerReducer} from 'react-router-redux';
import { combineReducers } from 'redux';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  homeReducer,
  routing: routerReducer
});
export default rootReducer;
