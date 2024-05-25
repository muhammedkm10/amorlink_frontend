import React from 'react'
import { useSelector } from 'react-redux'
import NotFoundPage from '../components/userside/UI/Error'


function Adminpagesprotection({children}) {
    const admin = useSelector(state=>state.auth.admintoken)
    console.log()
  return admin  ? children : <NotFoundPage/>
   
}

export default Adminpagesprotection