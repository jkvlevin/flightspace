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
            sanitizeFeatures(data, (name, noname, simplified) => {
              retData['namedBuildings'] = name;
              retData['nonameBuildings'] = noname;
              retData['buildingsSimplified'] = simplified;
              queryAdditionalFeatures(area, (error, data) => {
              if (error) {
                return callback(error, null);
              } else {
                // retData['additionalFeatures'] = data;
                sanitizeFeatures(data, (name, noname, simplified) => {
                  retData['namedFeatures'] = name;
                  retData['nonameFeatures'] = noname;
                  retData['featuresSimplified'] = simplified;
                  queryCenter(area, type, (error, data) => {
                    if (error) {
                      return callback(error, null);
                    } else {
                      retData['center'] = data;
                      // const d = JSON.stringify(retData, null, 2);
                      // fs.writeFile('./src/static/data.json', d, 'utf-8');
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

function sanitizeFeatures(data, callback) {
  let named = [];
  let noname = [];
  let namesimplefied = [];
  for (let i = data.features.length - 1; i > 0; i--) {
    if (data.features[i].properties.name || data.features[i].properties.tags.name) {
      named.push(data.features[i]);
      data.features[i].properties.name ? namesimplefied.push({name: data.features[i].properties.name, id: data.features[i].id, highway: data.features[i].properties.tags.highway, height: 10}) : namesimplefied.push({name: data.features[i].properties.tags.name, id: data.features[i].id, highway: data.features[i].properties.tags.highway, height:10 });
    } else if(!data.features[i].properties.name && !data.features[i].properties.tags.name) {
      noname.push(data.features[i]);
    }
    if (i == 1) {
      return callback(named, noname, namesimplefied);
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
  const query = '[out:json][timeout:500];'+type+'[name="'+area+'"];out center meta;';
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
