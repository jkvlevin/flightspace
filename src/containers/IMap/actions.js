import axios from 'axios';
import * as types from '../../static/actionTypes';

export function loadIMap(id) {
  return function (dispatch, getState) {
    axios.post('/api/loadsavedmap', {
      id: id
    }).then((response) => {
      if (response.status == 200) {
        const map = (JSON.parse(response.data.map));
        dispatch(loadMap(map));
      } else {
        console.log(response);
      }
    });
  };
}

function loadMap(map) {
  return { type: types.LOAD_MAP, map };
}
