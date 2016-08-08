import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Routes from './routes';
import './index.css';

ReactDOM.render(
  <AppContainer>
    <Routes />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const RoutesUpdate = require('./routes').default;

    ReactDOM.render(
      <AppContainer>
        <RoutesUpdate />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
