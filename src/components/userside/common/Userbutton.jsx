import React from 'react';
import styles from './Userbutton.module.css'; // Updated import statement

function Userbutton({ name, onClick,user }) {
  return (
    <button className={`${user ? styles.adminbutton : styles.userButton}`} onClick={onClick}>{name}</button>
  );
}

export default Userbutton;
