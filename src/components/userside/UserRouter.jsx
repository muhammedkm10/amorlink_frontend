// UserRouter.js
import React from 'react';
import UserLogin from './pages/loginpage/UserLogin';
import { Route, Routes } from 'react-router-dom';
import Registration from './pages/signuppage/Usersignup';
import Modal from './pages/signuppage/otp/otpmodal';

function UserRouter() {
  return (
    <Routes>
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/usersignup" element={<Registration/>} />
      <Route path="/modal" element={<Modal/>} />

    </Routes>
  );
}

export default UserRouter;
