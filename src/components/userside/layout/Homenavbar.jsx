import React, { useState } from 'react';
import logo from './../../../assets/images/logo-removebg-preview.png';
import styles from './Homenavbar.module.css'; // Import your CSS module
import {Link} from 'react-router-dom'

function Homenavbar() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleHamburgerClick = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <nav className={`container-fluid ${styles.nav}`}>
      <img
        src={logo} 
        className={styles.navbarLogo}
        alt="Logo"
      />
      <div className={styles.hamburger1} onClick={handleHamburgerClick}>
        <div className={styles.hamburger}>
        <i className={`fas fa-bars ${styles.hamburgerIcon}`}></i>
        </div>
      </div>

      <div className={`${styles.nav__link} ${isNavVisible ? '' : styles.hide}`}>
        <Link href="#">home</Link>
        <Link href="#">about</Link>
        <Link href="#">contact</Link>
        <Link href="#">blog</Link>
      </div>
    </nav>
  );
}

export default Homenavbar;
