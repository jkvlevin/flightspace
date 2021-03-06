import * as types from '../../static/actionTypes';
import loadSimplified from '../MarkupTool/actions';
import axios from 'axios';

export function queryArea(area) {
  return function (dispatch, getState) {
    if (getState().mapReducer.isQueryingData) {
      return null;
    } else {
      dispatch(isQuerying(true));
    }
    axios.post('/api/queryarea', {
      area: area
    }).then((response) => {
      if (response.status == 200) {
        // console.log(response.data);
        // response.data['nonameFeatures'] = response.data.nonameBuildings.concat(response.data.nonameFeatures);
        dispatch(loadArea(response.data));
        dispatch(loadSimplified(response.data));
      } else {
        console.log(response);
        dispatch(isQuerying(false));
      }
    });
  };
}

export function setBaseColor(color) {
  return { type: types.SET_BASE_COLOR, color };
}

export function isQuerying(isQ) {
  return { type: types.IS_QUERYING, isQ};
}

export function loadArea(areaData) {
  return { type: types.LOAD_AREA, areaData };
}

export function close() {
  return { type: types.CLOSE_MODAL };
}
