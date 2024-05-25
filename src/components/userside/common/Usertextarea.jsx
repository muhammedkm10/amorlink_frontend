import React from 'react';
import styles from './usertextarea.module.css';

const Usertextarea = ({ name, value, onChange, placeholder }) => {
  return (
    <div>
      <textarea
        className={styles.textarea} // Add the "textarea" class to apply the styles
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Usertextarea;
