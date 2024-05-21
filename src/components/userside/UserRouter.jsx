// UserRouter.js
import React from 'react';
import UserLogin from './pages/loginpage/UserLogin';
import { Route, Routes } from 'react-router-dom';
import Registration from './pages/signuppage/Usersignup';

function UserRouter() {
  return (
    <Routes>
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/usersignup" element={<Registration/>} />
    </Routes>
  );
}

export default UserRouter;
