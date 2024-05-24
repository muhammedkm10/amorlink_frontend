import React from 'react'
import { useSelector } from 'react-redux'
import Homenavbar from '../../layout/Homenavbar'

function Userhome() {
    const state = useSelector((state)=>state.auth)
    console.log(state)
  return (
    <div>
        <Homenavbar/>
    </div>
  )
}

export default Userhome