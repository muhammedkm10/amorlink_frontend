import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/adminlogin/AdminLogin';
import AdminHome from './pages/adminhome/AdminHome';
import Adminpagesprotection from '../../routprotections/Adminpagesprotection';
import Adminloginpageprotection from '../../routprotections/Adminloginprotection';
import NotFoundPage from '../userside/UI/Error';




function AdminRouter() {
  return (
    <Routes>
           <Route path="/adminlogin" element={<Adminloginpageprotection><AdminLogin/></Adminloginpageprotection>} />
           <Route path="/adminhome" element={<Adminpagesprotection><AdminHome/></Adminpagesprotection>} />

           <Route path="*" element={<NotFoundPage/>}></Route>



    </Routes>
    
  )
}

export default AdminRouter
