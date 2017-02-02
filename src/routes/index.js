/* eslint-disable no-console */
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const Router = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default Router;
