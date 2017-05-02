import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import { makeQuery } from './overpassManager';
/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);

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
      return res.status(400).send(error);
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
