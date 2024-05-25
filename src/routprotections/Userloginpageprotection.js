import React from 'react'
import { useSelector } from 'react-redux'
import Userhome from '../components/userside/pages/userhome/userhome'

const Userloginpageprotection = ({children}) => {
    const user = useSelector((state)=>state.auth.usertoken)
     
    return user === null ? children  : <Userhome/>
}

export default Userloginpageprotection


