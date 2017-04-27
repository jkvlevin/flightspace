import data from '../static/data';
import * as types from '../constants/actionTypes';


const initialState = {
  center: data.center,
  boundary: data.boundary,
  isQueryingData: false,
  noFlyBuildings: {type: "FeatureCollection", features: data.namedBuildings.concat(data.nonameBuildings)},
  namedBuildings: data.namedBuildings,
  buildingsSimplified: data.buildingsSimplified,
  flyAboveBuildings: {},
  noFlyFeatures: {},
  flyAboveFeatures: {type: "FeatureCollection", features: data.namedFeatures.concat(data.nonameFeatures)},
  featuresSimplified: data.featuresSimplified,
  namedFeatures: data.namedFeatures,
  maxFlyHeight: 400
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_AREA:
      return Object.assign({}, state, {
        center: action.areaData.center,
        namedBuildings: action.areaData.namedBuildings,
        noFlyBuildings: { type: "FeatureCollection", features: action.areaData.namedBuildings.concat(action.areaData.nonameBuildings) },
        boundary: action.areaData.boundary,
        namedFeatures: action.areaData.namedFeatures,
        flyAboveFeatures: { type: "FeatureCollection", features: action.areaData.namedFeatures.concat(action.areaData.nonameFeatures) },
        featuresSimplified: action.areaData.featuresSimplified,
        buildingsSimplified: action.areaData.buildingsSimplified,
        isQueryingData: false
      });
    case types.IS_QUERYING:
      return Object.assign({}, state, {
        isQueryingData: true
      });
    default:
      return state;
  }
}
