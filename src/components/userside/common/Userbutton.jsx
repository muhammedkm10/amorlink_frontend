import React from 'react';
import styles from './Userbutton.module.css'; // Updated import statement

function Userbutton({ name, onClick }) {
  return (
    <button className={styles.userButton} onClick={onClick}>{name}</button>
  );
}

export default Userbutton;
