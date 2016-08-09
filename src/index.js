import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';

import Routes from './routes';
import './index.css';

ReactDOM.render(
  <AppContainer errorReporter={Redbox}>
    <Routes />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // TODO: Remove console override when
    // https://github.com/reactjs/react-router/issues/2704 is fixed
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (message) => { // eslint-disable-line no-console
      if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
        orgError.apply(console, [message]);
      }
    };

    const RoutesUpdate = require('./routes').default;

    ReactDOM.render(
      <AppContainer errorReporter={Redbox}>
        <RoutesUpdate />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
