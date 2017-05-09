import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import { makeQuery } from './overpassManager';
import * as firebase from 'firebase';
/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);
const uuidV1 = require('uuid/v1');

let bodyParser = require('body-parser');

// let upload = multer({dest: 'uploads'})

/******************************************************************************
Server Setup and Middleware
*******************************************************************************/

let server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));


app.use(require('webpack-hot-middleware')(compiler));

 // to support JSON-encoded bodies
app.use(bodyParser.json({limit: '50mb'}));

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

const dbconfig = {
  apiKey: "AIzaSyAzn3Wxage9p-xZac2LxBblwF69JflBI60",
  authDomain: "flightspace-1490667841180.firebaseapp.com",
  databaseURL: "https://flightspace-1490667841180.firebaseio.com",
  storageBucket: "flightspace-1490667841180.appspot.com",
};

firebase.initializeApp(dbconfig);
const database = firebase.database();


app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.post('/api/queryarea', function(req, res) {
  const area = req.body.area;

  makeQuery(area, 'relation', (error, data) => {
    if (error) {
      return res.status(220).send(error);
    } else {
      return res.status(200).send(data);
    }
  });
});

app.post('/api/storemap', function(req, res) {
  const map = JSON.stringify(req.body.map);
  const id = uuidV1();
  firebase.database().ref('maps/' + id).set({
    map: map
  });
  return res.status(200).send(id);
});

app.post('/api/loadsavedmap', function(req, res) {
  const id = req.body.id;
  firebase.database().ref('maps/'+id).once('value').then(function(snapshot) {
    const map = snapshot.val();
    return res.status(200).send(JSON.stringify(map));
  });
});

// Error Middleware
app.use(function(err, req, res, next) {
    res.status(202).json({
        error: err
    });
});
