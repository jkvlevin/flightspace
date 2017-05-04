import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Main from './components/Main';
import IMap from './components/IMap';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="map" component={IMap} />
  </Route>
);
