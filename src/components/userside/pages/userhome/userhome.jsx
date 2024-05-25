import React from 'react'
import { useSelector } from 'react-redux'
import Homenavbar from '../../layout/Homenavbar'

function Userhome() {
    const state = useSelector((state)=>state.auth)
    console.log("inside the home page",state)
  return (
    <div>
        <Homenavbar/>
        <h1>user home page</h1>
    </div>
  )
}

export default Userhome