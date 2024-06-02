import React from 'react'
import styles from './Userdropdown.module.css'

const Userdropdown = ({ options, onChange, selectedValue, label, name }) => (
  <div className={styles.dropdown}>
    {label && <label className={styles['dropdown-label']}>{label}</label>}
    <select
      name={name}
      value={selectedValue}
      onChange={onChange}
      className={styles['dropdown-select']}
      required
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={option.value}
          disabled={option.value === ''}
          selected={index === 0}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export default Userdropdown
