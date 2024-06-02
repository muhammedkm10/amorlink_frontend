import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Adminpagesprotection({ children }) {
  const admin = useSelector((state) => state.auth.admintoken)
  const user = useSelector((state) => state.auth.usertoken)
  const loginPath = '/admin/adminlogin'
  return admin && !user ? children : <Navigate to={loginPath}></Navigate>
}

export default Adminpagesprotection
