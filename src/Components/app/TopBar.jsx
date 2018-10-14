import React from 'react';
import styles from './App.scss';
import BtnStart from './BtnStart';

const TopBar = () => {
  return (
      <div id='top_bar' style={styles}>
          <BtnStart />
      </div>
      )

};

export default TopBar;