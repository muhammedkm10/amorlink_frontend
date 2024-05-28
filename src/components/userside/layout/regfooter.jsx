import React from 'react';
import styles from './registrationfooter.module.css';

function RegistrationFooter({user}) {
  
  return (
    <footer className={styles.footer}>
      <div className={`container-fluid ${user ? styles.adminfootbar : styles.footerbar}`}></div>
    </footer>
  );
}

export default RegistrationFooter;
