/* eslint-disable no-console */
import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import asyncRoute from './async-route';
import Root from '../containers/root';

const Routes = () => (
  <Router>
    <Root>
      <Route
        exact
        path="/"
        component={asyncRoute(() => System.import('../components/home'))}
      />
      <Route
        path="/page2"
        component={asyncRoute(() => System.import('../components/page2'))}
      />
    </Root>
  </Router>
);

export default Routes;
