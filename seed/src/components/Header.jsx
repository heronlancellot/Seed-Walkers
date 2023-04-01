import React from 'react'
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header__container}>
      <div className={styles.header__container_metamask}>
        <h1>Header</h1>
      </div>
    </header>
  );
};

export default Header;
