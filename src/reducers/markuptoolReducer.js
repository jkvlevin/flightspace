import data from '../static/data1';
import * as types from '../static/actionTypes';

function comparator(a, b) {
  if(a.name < b.name){return -1;} else if(a.name > b.name){return 1;} else {return 0;}
}

const initialState = {
  waysSimplified: data.waysSimplified.sort(comparator),
  otherSimplified: data.otherSimplified.sort(comparator),
  buildingsSimplified: data.buildingsSimplified.sort(comparator),
  selectedSimplified: {name : '', height: '', flyAbove: ''},
};

export default function markuptoolReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_SIMPLIFIED:
      return Object.assign({}, state, {
        waysSimplified: action.areaData.waysSimplified.slice().sort(comparator),
        otherSimplified: action.areaData.otherSimplified.slice().sort(comparator),
        buildingsSimplified: action.areaData.buildingsSimplified.slice().sort(comparator)
      });
    case types.UPDATE_SIMPLIFIED_BUILDING:
      return Object.assign({}, state, {
        buildingsSimplified: action.sim.slice().sort(comparator),
        selectedSimplified: action.selected
      });
    case types.UPDATE_SIMPLIFIED_WAYS:
      return Object.assign({}, state, {
        waysSimplified: action.sim.slice().sort(comparator),
        selectedSimplified: action.selected
      });
    case types.UPDATE_SIMPLIFIED_OTHER:
      return Object.assign({}, state, {
        otherSimplified: action.sim.slice().sort(comparator),
        selectedSimplified: action.selected
      });
    case types.SELECT_SIMPLE:
      return Object.assign({}, state, {
        selectedSimplified: action.feature
      });
    default:
      return state;
  }
}
