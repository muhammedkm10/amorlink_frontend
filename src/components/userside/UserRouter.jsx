// UserRouter.js
import React from 'react';
import UserLogin from './pages/loginpage/UserLogin';
import { Route, Routes } from 'react-router-dom';
import Registration from './pages/signuppage/Usersignup';
import Modal from './pages/signuppage/otp/otpmodal';
import Userhome from './pages/userhome/userhome';


function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/usersignup" element={<Registration/>} />
      <Route path="/modal" element={<Modal/>} />
      <Route path="/userhome" element={<Userhome/>} />


    </Routes>
  );
}

export default UserRouter;
