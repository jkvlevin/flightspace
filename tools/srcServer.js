import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import { makeQuery } from './overpassManager';
/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);

let bodyParser = require('body-parser');
// let pg = require('pg');

// let upload = multer({dest: 'uploads'})

/******************************************************************************
Server Setup and Middleware
*******************************************************************************/

let server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});

// const dburl = 'postgres://xqqxjhquwmqnwk:04e56471617e7792869af7c6aabca80efe7748955014d61e460a23f8a56f7d47@ec2-54-235-120-39.compute-1.amazonaws.com:5432/d8f3m3lsbu7b34';
//
// pg.defaults.ssl = true;
// pg.connect(dburl, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');
// });

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

 // to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

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


// Error Middleware
app.use(function(err, req, res, next) {
    res.status(202).json({
        error: err
    });
});
