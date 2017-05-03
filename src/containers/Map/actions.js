import * as types from '../../static/actionTypes';
import loadSimplified from '../MarkupTool/actions';
import axios from 'axios';

export function queryArea(area) {
  return function (dispatch, getState) {
    if (getState().mapReducer.isQueryingData) {
      return null;
    } else {
      dispatch(isQuerying());
    }
    axios.post('/api/queryarea', {
      area: area
    }).then((response) => {
      if (response.status == 200) {
        // console.log(response.data);
        dispatch(loadArea(response.data));
        dispatch(loadSimplified(response.data));
      } else {
        // console.log(response);
      }
    });
  };
}

function isQuerying() {
  return { type: types.IS_QUERYING };
}

function loadArea(areaData) {
  return { type: types.LOAD_AREA, areaData };
}
