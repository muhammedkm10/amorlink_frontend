import React from 'react'
import { useSelector } from 'react-redux'
import NotFoundPage from '../components/userside/UI/Error'


function Adminloginpageprotection({children}) {
    const admin = useSelector(state=>state.auth.admintoken)
    const user = useSelector(state=>state.auth.usertoken)
  return admin || user ?  <NotFoundPage/> : children 
   
}

export default Adminloginpageprotection