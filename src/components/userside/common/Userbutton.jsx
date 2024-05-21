import React from 'react'
import './userbutton.css'

function Userbutton({name,onClick}) {
  return (
    <button className='userbutton' onClick={onClick}>{name}</button>
  )
}

export default Userbutton