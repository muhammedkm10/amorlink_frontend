import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
// import AdminLogin from './pages/adminlogin/AdminLogin';
// import AdminHome from './pages/adminhome/AdminHome';
import Adminpagesprotection from '../../routprotections/Adminpagesprotection';
import Adminloginpageprotection from '../../routprotections/Adminloginprotection';
import NotFoundPage from '../userside/UI/Error';

const AdminLogin = React.lazy(()=>import ('./pages/adminlogin/AdminLogin'))
const AdminHome = React.lazy(()=>import ( './pages/adminhome/AdminHome'))



function AdminRouter() {

  return (
    <Suspense fallback={<div> loading....</div>}>
    <Routes>
           <Route path="/adminlogin" element={<Adminloginpageprotection><AdminLogin/></Adminloginpageprotection>} />
           <Route path="/adminhome" element={<Adminpagesprotection><AdminHome/></Adminpagesprotection>} />

           <Route path="*" element={<NotFoundPage/>}></Route>



    </Routes>
    </Suspense>
  )
}

export default AdminRouter
