import React from 'react';
import styles from './Registrationnavbar.module.css';
import logo from './../../../assets/images/logo-removebg-preview.png';

function RegistrationNavbar() {
  return (
    <div className={`container-fluid ${styles.navbar1}`}>
      <img className={`img-fluid ${styles.logo}`} src={logo} alt="logo" />
    </div>
  );
}

export default RegistrationNavbar;

