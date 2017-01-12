import React from 'react';
import { Router, browserHistory } from 'react-router';

import Root from '../containers/root';

if (process.env.NODE_ENV === 'development' && module.hot) {
  // HMR falls over when a Route uses a dynamic component resolution
  // property (i.e. getComponent or getComponents).  As a workaround for any
  // of your components that are resolved dynamically please require them below.
  require('../components/home');
  require('../components/page2');
}

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

const rootRoutes = {
  component: Root,
  childRoutes: [
    {
      path: '/',
      getComponent(nextState, cb) {
        System.import('../components/home')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'page2',
      getComponent(nextState, cb) {
        System.import('../components/page2')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }
  ]
};

const Routes = () => <Router history={browserHistory} routes={rootRoutes} />;

export default Routes;
