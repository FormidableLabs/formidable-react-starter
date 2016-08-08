import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Root from './components/root';
import Home from './components/home';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

export default Routes;
