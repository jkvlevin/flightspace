const overpass = require('query-overpass');
var fs = require('fs');

export function makeQuery(area, type, callback) {
  let retData = {}
  queryBoundary(area, type, (error, data) => {
    if (error) {
      return callback(error, null);
    } else {
      sanitizeBoundary(data, (boundary) => {
        retData['boundary'] = boundary;
        queryBuildings(area, (error, data) => {
          if (error) {
            return callback(error, null);
          } else {
            sanitizeBuildings(data, (name, noname, simplified) => {
              retData['flyAboveBuildings'] = name;
              retData['noFlyBuildings'] = [];
              retData['nonameBuildings'] = noname;
              retData['buildingsSimplified'] = simplified;
              queryAdditionalFeatures(area, (error, data) => {
              if (error) {
                return callback(error, null);
              } else {
                // retData['additionalFeatures'] = data;
                sanitizeFeatures(data, (name, noname, simpWays, simpOther) => {
                  retData['flyAboveFeatures'] = name;
                  retData['noFlyFeatures'] = [];
                  retData['nonameFeatures'] = noname;
                  retData['waysSimplified'] = simpWays;
                  retData['otherSimplified'] = simpOther;
                  // return callback(null, retData);
                  queryCenter(area, type, (error, data) => {
                    if (error) {
                      return callback(error, null);
                    } else {
                      retData['center'] = data;
                      // const d = JSON.stringify(retData, null, 2);
                      // fs.writeFile('./src/static/data1.json', d, 'utf-8');
                      return callback(null, retData);
                    }
                  });
                });
                }
              });
            });
          }
        });
      });
    }
  });
}

function queryBoundary(area, type, callback) {
  const query = '[out:json][timeout:600];'+type+'[name="'+area+'"];(._;>;);out;';
  overpass(query, (error, data) => {
    if(error) {
      console.log('boundary error');
      return callback(error, null);
    } else if(data.features.length > 0) {
      return callback(null, data);
    } else {
      if (type == 'relation') queryBoundary(area, 'way', callback);
      else if (type == 'way') queryBoundary(area, 'node', callback);
      else if (type == 'node') return callback(null, data);
    }
  });
}

function sanitizeBoundary(data, callback) {
  for (let i = data.features.length - 1; i > 0; i--) {
    if (data.features[i].geometry['type'] == "Point") {
      data.features.splice(i, 1)
    } else if (data.features[i].geometry['type'] != "Point") {
      return callback(data);
    }
  }
}

function queryBuildings(area, callback) {
  const query = '[out:json][timeout:600];(area[name="'+area+'"];way(area)["building"];relation(area)["building"];);out body;>;out skel qt;';
  overpass(query, (error, data) => {
    if(error) {
      console.log('buildings error');
      return callback(error, null);
    } else {
      return callback(null, data);
    }
  });
}

function sanitizeBuildings(data, callback) {
  let named = [], noname = [], simplified = [];
  for (let i = 0; i < data.features.length; i++) {
    if (data.features[i].properties.tags.name) {
      named.push(data.features[i]);
      simplified.push({name: data.features[i].properties.tags.name, id: data.features[i].id, highway: data.features[i].properties.tags.highway, height:40, flyAbove: 90, noFly: false });
    } else if(!data.features[i].properties.tags.name) {
      noname.push(data.features[i]);
    } if (i == data.features.length-1) {
      return callback(named, noname, simplified);
    }
  }
}

function sanitizeFeatures(data, callback) {
  let named = [], noname = [], simpWays = [], simpOther = [];
  for (let i = 0; i < data.features.length; i++) {
    if (data.features[i].properties.tags.name) {
      named.push(data.features[i]);
      if (data.features[i].properties.tags.highway) {
        simpWays.push({name: data.features[i].properties.tags.name, id: data.features[i].id, height:0, flyAbove:50, highway: data.features[i].properties.tags.highway, noFly: false });
      } else {
        simpOther.push({name: data.features[i].properties.tags.name, id: data.features[i].id, height:40, flyAbove:90, noFly: false });
      }
    } else if(!data.features[i].properties.tags.name) {
      noname.push(data.features[i]);
    } if (i == data.features.length-1) {
      return callback(named, noname, simpWays, simpOther);
    }
  }
}

function queryAdditionalFeatures(area, callback) {
  const query = '[out:json][timeout:600];(area[name="'+area+'"];way(area)["building"!~"."]["place"!~"."];relation(area)["building"!~"."]["place"!~"."];);out body;>;out skel qt;';
  overpass(query, (error, data) => {
    if(error) {
      console.log(error);
      console.log('additional features error');
      return callback(error, null);
    } else {
      return callback(null, data);
    }
  });
}

function queryCenter(area, type, callback) {
  const query = '[out:json][timeout:400];'+type+'[name="'+area+'"];out center meta;';
  overpass(query, (error, data) => {
    if(error) {
      console.log('center error');
      return callback(error, null);
    } else if (data.features.length > 0) {
      return callback(null, data);
    } else {
      if (type == 'relation') queryCenter(area, 'way', callback);
      else if (type == 'way') queryCenter(area, 'node', callback);
      else if (type == 'node') return callback(null, data);
    }
  });
}
