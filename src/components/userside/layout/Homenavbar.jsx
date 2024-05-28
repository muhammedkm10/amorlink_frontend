import React, { useState } from 'react';
import logo from './../../../assets/images/logo-removebg-preview.png';
import styles from './Homenavbar.module.css'; // Import your CSS module
import {Link, Navigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip'

function Homenavbar({name}) {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const dispatch = useDispatch()
  const handleHamburgerClick = () => {
    setIsNavVisible(!isNavVisible);
  };

   const  logout = () =>{
       dispatch({type:"LOGIN FAILURE"})
       localStorage.removeItem("authUserTokens");
       localStorage.removeItem("role");
       <Navigate to="/" replace />

  }
console.log(name)

  return (
    <div>
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

      <div className={`${styles.nav__link} ${isNavVisible ? '' : styles.hide} `}>
        <Link to="/userhome" title='Home'> <i className={`fas fa-home  icon${styles.hamburgerIcon}`} title="Home"style={{ color: 'white' }}></i></Link>
        <Link to="#">Matches</Link>
        <Link to="#">Chat</Link>
        <Link to="#">PRO*</Link>
        <Link to="#">Search</Link>
        <Link to="/userprofile" data-tooltip-id="my-tooltip" data-tooltip-content={name}  > <i className="fas fa-user" style={{ color: 'white' }}  ></i> </Link>
        <Tooltip id="my-tooltip"  type="dark" effect="solid" />        
        <Link onClick={logout}  title='logout'><i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i></Link>
      </div>

    </nav>
    
     </div>
  );
}

export default Homenavbar;
