import data from '../static/data1';
import * as types from '../static/actionTypes';


const initialState = {
  // center: data.center,
  boundary: data.boundary,
  isQueryingData: false,
  flyAboveBuildings: data.namedBuildings,
  noFlyBuildings: [],
  noFlyFeatures: [],
  flyAboveFeatures: data.namedFeatures,
  nonameFeatures: data.nonameBuildings.concat(data.nonameFeatures),
  maxFlyHeight: 400
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_AREA:
      return Object.assign({}, state, {
        // center: action.areaData.center,
        flyAboveBuildings: action.areaData.namedBuildings,
        boundary: action.areaData.boundary,
        flyAboveFeatures: action.areaData.namedFeatures,
        nonameFeatures: action.areaData.nonameBuildings.concat(action.areaData.nonameFeatures),
        isQueryingData: false
      });
    case types.IS_QUERYING:
      return Object.assign({}, state, {
        isQueryingData: true
      });
    case types.MOVE_BUILDING:
      return Object.assign({}, state, {
        noFlyBuildings: action.nof,
        flyAboveBuildings: action.fab,
      });
    case types.MOVE_FEATURE:
      return Object.assign({}, state, {
        noFlyFeatures: action.nof,
        flyAboveFeatures: action.fab,
      });
    default:
      return state;
  }
}
