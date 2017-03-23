import React from 'react';

import Container from './container';
import styles from './header.css';

const logo = require('../assets/logo.svg');

const Header = () => (
  <header className={styles.header}>
    <Container>
      <img src={logo} />
    </Container>
  </header>
);

export default Header;
