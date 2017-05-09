import data from '../static/data1';
import * as types from '../static/actionTypes';


const initialState = {
  center: {},
  boundary: {},
  flyAboveBuildings: [],
  noFlyBuildings: [],
  noFlyFeatures: [],
  flyAboveFeatures: [],
  nonameFeatures: [],
  maxFlyHeight: 400,
  baseColor: '',
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_MAP:
      return Object.assign({}, state, {
        center: action.map.center,
        flyAboveBuildings: action.map.flyAboveBuildings,
        boundary: action.map.boundary,
        flyAboveFeatures: action.map.flyAboveFeatures,
        noFlyBuildings: action.map.noFlyBuildings,
        noFlyFeatures: action.map.noFlyFeatures,
        nonameFeatures: action.map.nonameFeatures,
        baseColor: action.map.baseColor
      });

    default:
      return state;
  }
}
