import React from 'react'
import './userinput.css'


function Userinput({placeholder}) {
  return (
    <div>
          <input type="text" placeholder={placeholder} />
    </div>
  )
}

export default Userinput