import React from 'react'
import styles from './Registrationnavbar.module.css'
import logo from './../../../assets/images/logo-removebg-preview.png'

function RegistrationNavbar({ user }) {
  return (
    <div
      className={`container-fluid ${user ? styles.adminnavbar : styles.navbar1}`}
    >
      <img className={`img-fluid ${styles.logo}`} src={logo} alt="logo" />
    </div>
  )
}

export default RegistrationNavbar
