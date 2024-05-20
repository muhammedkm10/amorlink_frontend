// UserRouter.js
import React from 'react';
import UserLogin from './pages/UserLogin';
import { Route, Routes } from 'react-router-dom';

function UserRouter() {
  return (
    <Routes>
      <Route path="/userlogin" element={<UserLogin />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default UserRouter;
