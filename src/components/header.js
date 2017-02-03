import React from 'react';

import Container from './container';
import styles from './header.css';

const Header = () => (
  <header className={styles.header}>
    <Container>
      <img src="/assets/logo.svg" />
    </Container>
  </header>
);

export default Header;
