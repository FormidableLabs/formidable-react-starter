import React, { PropTypes } from 'react';

import styles from './root.css';

const Root = (props) => (
  <div className={styles.container}>
    {props.children}
  </div>
);

Root.propTypes = {
  children: PropTypes.node
};

export default Root;
