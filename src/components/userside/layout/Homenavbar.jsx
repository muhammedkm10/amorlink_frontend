import React, { useState } from 'react';
import styles from './Homenavbar.module.css'; // Import your CSS module

function Homenavbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <img
          src="https://via.placeholder.com/40"
          width="40"
          height="40"
          className={styles.navbarLogo}
          alt="Logo"
        />
      </div>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </button>
      <div className={`${styles.navLinks} ${showMenu ? styles.show : ''}`}>
        <div className={styles.linksCenter}>
          <div className={styles.navLink}>Home</div>
          <div className={styles.navLink}>Link 1</div>
          <div className={styles.navLink}>Link 2</div>
          <div className={styles.navLink}>Link 3</div>
          <div className={styles.navLink}>Link 4</div>
          <div className={styles.navLink}>Link 5</div>
        </div>
        
      </div>
    </div>
  );
}

export default Homenavbar;
