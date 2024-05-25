import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/adminlogin/AdminLogin';
import AdminHome from './pages/adminhome/AdminHome';
import Adminpagesprotection from '../../routprotections/Adminpagesprotection';
import Adminloginpageprotection from '../../routprotections/Adminloginprotection';




function AdminRouter() {
  return (
    <Routes>
           <Route path="/adminlogin" element={<Adminloginpageprotection><AdminLogin/></Adminloginpageprotection>} />
           <Route path="/adminhome" element={<Adminpagesprotection><AdminHome/></Adminpagesprotection>} />

    </Routes>
    
  )
}

export default AdminRouter
