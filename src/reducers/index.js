import {routerReducer} from 'react-router-redux';
import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import markuptoolReducer from './markuptoolReducer';
import imapReducer from './imapReducer'

const rootReducer = combineReducers({
  mapReducer,
  markuptoolReducer,
  imapReducer,
  routing: routerReducer
});
export default rootReducer;
