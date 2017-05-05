import update from 'immutability-helper';
import { loadArea, setBaseColor } from '../Map/actions';
import * as types from '../../static/actionTypes';

export function updateSettings(baseFly, dBH, rFH) {
  return function (dispatch, getState) {
    if(baseFly) {
      dispatch(setBaseColor('#2FD566'));
    } else {
      dispatch(setBaseColor('red'));
    }
    const bsim = getState().markuptoolReducer.buildingsSimplified, wsim = getState().markuptoolReducer.waysSimplified, osim = getState().markuptoolReducer.otherSimplified;
    let bH = [], ways = [], others = [];
    for (let b in bsim) {
      let bu = JSON.parse(JSON.stringify(bsim[b]));
      bu.height = dBH;
      bu.flyAbove = (parseInt(bu.height) + parseInt(rFH));
      bH.push(bu);
    }
    for (let w in wsim) {
      let wu = JSON.parse(JSON.stringify(wsim[w]));
      wu.flyAbove = (parseInt(wu.height) + parseInt(rFH));
      ways.push(wu);
    }
    for (let f in osim) {
      let fu = JSON.parse(JSON.stringify(osim[f]));
      fu.flyAbove = (parseInt(fu.height) + parseInt(rFH));
      others.push(fu);
    }
    dispatch(updateSimplifiedBuilding(bH, {name:'', height:'', flyAbove:''}));
    dispatch(updateSimplifiedWays(ways, {name:'', height:'', flyAbove:''}));
    dispatch(updatedSimplifiedOther(others, {name:'', height:'', flyAbove:''}));
  };
}

export function loadMapFileData(file) {
  return function (dispatch, getState) {
    const data = JSON.parse(file);
    const markupData = {
      waysSimplified: data.waysSimplified,
      otherSimplified: data.otherSimplified,
      buildingsSimplified: data.buildingsSimplified
    };
    const mapData = {
      center: data.center,
      boundary: data.boundary,
      noFlyBuildings: data.noFlyBuildings,
      flyAboveBuildings: data.flyAboveBuildings,
      flyAboveFeatures: data.flyAboveFeatures,
      noFlyFeatures: data.noFlyFeatures,
      isQueryingData: data.isQueryingData,
      nonameFeatures: data.nonameFeatures,
      nonameBuildings: []
    };
    dispatch(loadSimplified(markupData));
    dispatch(loadArea(mapData));
    dispatch(setBaseColor(data.baseColor));
  };
}

export function changeHeight(newHeight, type) {
  return function (dispatch, getState) {
    let sF = JSON.parse(JSON.stringify(getState().markuptoolReducer.selectedSimplified));
    sF.height = newHeight;

    let sim = [];
    if (type == 'fab' || type == 'nfb') {sim = getState().markuptoolReducer.buildingsSimplified;}
    if (type == 'faw' || type == 'nfw') {sim = getState().markuptoolReducer.waysSimplified;}
    if (type == 'fao' || type == 'nfo') {sim = getState().markuptoolReducer.otherSimplified;}
    var i = sim.map(function(x) {return x.id; }).indexOf(sF.id);
    sim = update(sim, {$splice: [[i, 1]]});
    sim = update(sim, {$push: [sF]});

    if (type == 'fab' || type == 'nfb') {dispatch(updateSimplifiedBuilding(sim, sF));}
    if (type == 'faw' || type == 'nfw') {dispatch(updateSimplifiedWays(sim, sF));}
    if (type == 'fao' || type == 'nfo') {dispatch(updatedSimplifiedOther(sim, sF));}
  };
}

export function changeFlyAbove(newHeight, type) {
  return function (dispatch, getState) {
    let sF = JSON.parse(JSON.stringify(getState().markuptoolReducer.selectedSimplified));
    sF.flyAbove = newHeight;

    let sim = [];
    if (type == 'fab' || type == 'nfb') {sim = getState().markuptoolReducer.buildingsSimplified;}
    if (type == 'faw' || type == 'nfw') {sim = getState().markuptoolReducer.waysSimplified;}
    if (type == 'fao' || type == 'nfo') {sim = getState().markuptoolReducer.otherSimplified;}
    var i = sim.map(function(x) {return x.id; }).indexOf(sF.id);
    sim = update(sim, {$splice: [[i, 1]]});
    sim = update(sim, {$push: [sF]});

    if (type == 'fab' || type == 'nfb') {dispatch(updateSimplifiedBuilding(sim, sF));}
    if (type == 'faw' || type == 'nfw') {dispatch(updateSimplifiedWays(sim, sF));}
    if (type == 'fao' || type == 'nfo') {dispatch(updatedSimplifiedOther(sim, sF));}
  };
}


export function loadSimplified(areaData) {
  return { type: types.LOAD_SIMPLIFIED, areaData };
}

export function changeSelected(feature, type) {
  return function (dispatch, getState) {
    let fullFeature = {};
    let simFeature = {};
    if (type === 'fab') {
      fullFeature = getState().mapReducer.flyAboveBuildings.find(b => b.id === feature);
      simFeature = getState().markuptoolReducer.buildingsSimplified.find(b=> b.id === feature);
    }
    else if(type === 'nfb'){
      fullFeature = getState().mapReducer.noFlyBuildings.find(b => b.id === feature);
      simFeature = getState().markuptoolReducer.buildingsSimplified.find(b=> b.id === feature);
    }
    else if (type == 'faw') {
      fullFeature = getState().mapReducer.flyAboveFeatures.find(b => b.id === feature);
      simFeature = getState().markuptoolReducer.waysSimplified.find(b=> b.id === feature);
    }
    else if (type == 'nfw') {
      fullFeature = getState().mapReducer.noFlyFeatures.find(b => b.id === feature);
      simFeature = getState().markuptoolReducer.waysSimplified.find(b=> b.id === feature);
    }
    else if (type == 'fao') {
      fullFeature = getState().mapReducer.flyAboveFeatures.find(b => b.id === feature);
      simFeature = getState().markuptoolReducer.otherSimplified.find(b=> b.id === feature);
    }
    else if (type == 'nfo') {
      fullFeature = getState().mapReducer.noFlyFeatures.find(b => b.id === feature);
      simFeature = getState().markuptoolReducer.otherSimplified.find(b=> b.id === feature);
    }

    dispatch(selectFeature(fullFeature));
    dispatch(selectSimple(simFeature));
  };
}

export function setNoFlyBuilding(building) {
  return function (dispatch, getState) {
    let fab = [], nof = [], f = getState().mapReducer.flyAboveBuildings;
    for (let i = 0; i < f.length; i++) {
      if (f[i].id === building) {
        nof = update(getState().mapReducer.noFlyBuildings, {$push: [f[i]]});
        fab = update(f, {$splice: [[i, 1]]});
        break;
      }
    }

    let sim = [], s = getState().markuptoolReducer.buildingsSimplified;
    for (let i = 0; i < s.length; i++) {
      if (s[i].id === building) {
        let b = JSON.parse(JSON.stringify(s[i]));
        sim = update(s, {$splice: [[i, 1]]});
        b.noFly = true;
        sim = update(sim, {$push: [b]});
        break;
      }
    }
    dispatch(moveBuilding(nof, fab));
    dispatch(updateSimplifiedBuilding(sim, {name:'', height:'', flyAbove:''}));
  }
}

export function setNoFlyFeature(feature, type) {
  return function (dispatch, getState) {
    let fab = [], nof = [], f = getState().mapReducer.flyAboveFeatures;
    for (let i = 0; i < f.length; i++) {
      if (f[i].id === feature) {
        nof = update(getState().mapReducer.noFlyFeatures, {$push: [f[i]]});
        fab = update(f, {$splice: [[i, 1]]});
        break;
      }
    }

    let sim = [], s = [];
    if (type == "faw") {s = getState().markuptoolReducer.waysSimplified;}
    else {s = getState().markuptoolReducer.otherSimplified;}

    for (let i = 0; i < s.length; i++) {
      if (s[i].id === feature) {
        let f = JSON.parse(JSON.stringify(s[i]));
        f.noFly = true;
        sim = update(s, {$splice: [[i, 1]]});
        sim = update(sim, {$push: [f]});
        break;
      }
    }
    dispatch(moveFeature(nof, fab));
    if (type == "faw") {dispatch(updateSimplifiedWays(sim, {name:'', height:'', flyAbove:''}));}
    else {dispatch(updatedSimplifiedOther(sim, {name:'', height:'', flyAbove:''}));}
  }
}

export function setFlyAboveBuilding(building) {
  return function (dispatch, getState) {
    let fab = [], nof = [], f = getState().mapReducer.noFlyBuildings;
    for (let i = 0; i < f.length; i++) {
      if (f[i].id === building) {
        fab = update(getState().mapReducer.flyAboveBuildings, {$push: [f[i]]});
        nof = update(f, {$splice: [[i, 1]]});
        break;
      }
    }

    let sim = [], s = getState().markuptoolReducer.buildingsSimplified;
    for (let i = 0; i < s.length; i++) {
      if (s[i].id === building) {
        let b = JSON.parse(JSON.stringify(s[i]));
        sim = update(s, {$splice: [[i, 1]]});
        b.noFly = false;
        sim = update(sim, {$push: [b]});
        break;
      }
    }
    dispatch(moveBuilding(nof, fab));
    dispatch(updateSimplifiedBuilding(sim, {name:'', height:'', flyAbove:''}));
  }
}

export function setFlyAboveFeature(feature, type) {
  return function (dispatch, getState) {
    let fab = [], nof = [], f = getState().mapReducer.noFlyFeatures;
    for (let i = 0; i < f.length; i++) {
      if (f[i].id === feature) {
        fab = update(getState().mapReducer.flyAboveFeatures, {$push: [f[i]]});
        nof = update(f, {$splice: [[i, 1]]});
        break;
      }
    }

    let sim = [], s = [];
    if (type == "nfw") {s = getState().markuptoolReducer.waysSimplified;}
    else {s = getState().markuptoolReducer.otherSimplified;}

    for (let i = 0; i < s.length; i++) {
      if (s[i].id === feature) {
        let f = JSON.parse(JSON.stringify(s[i]));
        sim = update(s, {$splice: [[i, 1]]});
        f.noFly = false;
        sim = update(sim, {$push: [f]});
        break;
      }
    }
    dispatch(moveFeature(nof, fab));
    if (type == "nfw") {dispatch(updateSimplifiedWays(sim, {name:'', height:'', flyAbove:''}));}
    else {dispatch(updatedSimplifiedOther(sim, {name:'', height:'', flyAbove:''}));}
  }
}


function selectFeature(feature) {
  return { type: types.SELECT_FEATURE, feature };
}

function selectSimple(feature) {
  return { type: types.SELECT_SIMPLE, feature };
}
function updateSimplifiedBuilding(sim, selected) {
  return { type: types.UPDATE_SIMPLIFIED_BUILDING, sim, selected };
}
function updateSimplifiedWays(sim, selected) {
  return { type: types.UPDATE_SIMPLIFIED_WAYS, sim, selected };
}
function updatedSimplifiedOther(sim, selected) {
  return { type: types.UPDATE_SIMPLIFIED_OTHER, sim, selected };
}
function moveBuilding(nof, fab) {
  return { type: types.MOVE_BUILDING, nof, fab };
}
function moveFeature(nof, fab) {
  return { type: types.MOVE_FEATURE, nof, fab };
}
