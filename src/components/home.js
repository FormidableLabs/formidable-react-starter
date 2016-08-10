import React from 'react';
import { Link } from 'react-router';

import styles from './home.css';

const Home = () => (
  <div>
    <h1 className={styles.heading}>WELCOME TO YOUR APP</h1>
    <Link to="/page2">Go to page 2</Link>
  </div>
);

export default Home;
