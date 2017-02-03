import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Container from './container';

const Home = () => (
  <Container>
    <Helmet title="Home" />
    <h1>Welcome to your app</h1>
    <Link to="/page2">Go to page 2</Link>
  </Container>
);

export default Home;
