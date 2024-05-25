import React from 'react'
import './userinput.module.css'


function Userinput({placeholder, type, name, value, onChange }) {
  const classname = type === "number"? "input1":"input2"
  return (
    <div>
          <input className={classname}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange} />
          </div>
  )
}

export default Userinput