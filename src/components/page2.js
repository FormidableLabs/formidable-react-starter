import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Container from './container';

const Page2 = () => (
  <Container>
    <Helmet title="Page 2" />
    <h1>Page 2</h1>
    <Link to="/">Go back</Link>
  </Container>
);

export default Page2;
