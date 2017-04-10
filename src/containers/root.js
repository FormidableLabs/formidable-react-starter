import React from 'react';
import PropTypes from 'prop-types';

import styles from './root.css';

const Root = props => (
  <div className={styles.root}>
    {props.children}
  </div>
);

Root.propTypes = {
  children: PropTypes.node
};

export default Root;
