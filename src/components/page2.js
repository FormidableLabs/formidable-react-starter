import React from 'react';
import { Link } from 'react-router';

import styles from './page2.css';

const Page2 = () => (
  <div>
    <h1 className={styles.heading}>OH DANG ITS PAGE2</h1>
    <Link to="/">Go back</Link>
  </div>
);

export default Page2;
