import React from 'react'
import './userdropdown.css'

const Userdropdown = ({ options, onChange, selectedValue, label, name }) => (
    <div className="dropdown">
      {label && <label className="dropdown-label">{label}</label>}
      <select name={name} value={selectedValue} onChange={onChange} className="dropdown-select">
        {options.map((option, index) => (
          <option key={index} value={option.value} disabled={option.value === ''}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

export default Userdropdown