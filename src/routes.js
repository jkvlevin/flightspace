import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Main from './components/Main';
import IMap from './containers/IMap';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="map/:mapid" component={IMap} />
  </Route>
);
