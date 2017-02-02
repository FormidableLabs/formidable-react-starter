/* eslint-disable no-console */
import React from 'react';

import { Route } from 'react-router-dom';

/* eslint-disable no-var */
import asyncRoute from './async-route';
import Root from '../containers/root';

if (typeof System === 'undefined') {
  var System = {
    import: path => {
      return require(path).default;
    }
  };
}

const Routes = () => (
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
);

export default Routes;
