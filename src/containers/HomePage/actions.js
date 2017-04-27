import * as types from '../../constants/actionTypes';
import axios from 'axios';

export function queryArea(area) {
  return function (dispatch, getState) {
    if (getState().homeReducer.isQueryingData) {
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
