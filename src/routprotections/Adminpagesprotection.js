import React from 'react'
import { useSelector } from 'react-redux'
import NotFoundPage from '../components/userside/UI/Error'


function Adminpagesprotection({children}) {
    const admin = useSelector(state=>state.auth.admintoken)
    const user = useSelector(state=>state.auth.usertoken)

    console.log()
  return admin && !user ? children : <NotFoundPage/>
   
}

export default Adminpagesprotection