import data from '../static/data1';
import * as types from '../static/actionTypes';


const initialState = {
  center: data.center,
  boundary: data.boundary,
  isQueryingData: false,
  flyAboveBuildings: data.flyAboveBuildings,
  noFlyBuildings: data.noFlyBuildings,
  noFlyFeatures: data.noFlyFeatures,
  flyAboveFeatures: data.flyAboveFeatures,
  nonameFeatures: data.nonameBuildings.concat(data.nonameFeatures),
  maxFlyHeight: 400,
  selectedFeature: {},
  baseColor: '#2FD566'
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_AREA:
      return Object.assign({}, state, {
        center: action.areaData.center,
        flyAboveBuildings: action.areaData.flyAboveBuildings,
        boundary: action.areaData.boundary,
        flyAboveFeatures: action.areaData.flyAboveFeatures,
        noFlyBuildings: action.areaData.noFlyBuildings,
        noFlyFeatures: action.areaData.noFlyFeatures,
        nonameFeatures: action.areaData.nonameFeatures.concat(action.areaData.nonameBuildings),
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
    case types.SELECT_FEATURE:
      return Object.assign({}, state, {
        selectedFeature: action.feature
      });
    case types.SET_BASE_COLOR:
      return Object.assign({}, state, {
        baseColor: action.color
      });
    default:
      return state;
  }
}
