import React from 'react'
import styles from './RadioButton.module.css'

const RadioButton = ({ label, name, value, checked, onChange }) => {
  return (
    <div className={styles['radio-button']}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles['radio-input']}
      />
      <label htmlFor={value} className={styles['radio-label']}>
        {label}
      </label>
    </div>
  )
}

export default RadioButton
