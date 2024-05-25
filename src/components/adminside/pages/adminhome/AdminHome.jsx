import React from 'react'
import { useSelector } from 'react-redux'
import './AdminHome.module.css'

function AdminHome() {
    const state = useSelector(state=>state.auth.admintoken)
    console.log(state);
  return (
    <div>AdminHome</div>
  )
}

export default AdminHome