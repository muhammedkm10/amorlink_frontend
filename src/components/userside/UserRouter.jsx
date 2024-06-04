// UserRouter.js
import React from 'react';
import UserLogin from './pages/loginpage/UserLogin';
import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from './pages/signuppage/Usersignup';
import Modal from './pages/signuppage/otp/otpmodal';
import Userhome from './pages/userhome/userhome';
import Userprofile from './pages/userprofile/Userprofile';
import Usersiderouteprotection from '../../routprotections/Usersiderouteprotection';
import Userloginpageprotection from '../../routprotections/Userloginpageprotection';
import NotFoundPage from './UI/Error';
import { useSelector } from 'react-redux';
import Preferences from './pages/preference/Preferences';


function UserRouter() {
  const state = useSelector(state=>state.otppage.isvisible)
  return (
    <Routes>
      {/* login router */}
      <Route path="" element={<Userloginpageprotection><UserLogin/></Userloginpageprotection>} />
      {/* other authentication need routes*/}
      <Route path="/usersignup" element={<Userloginpageprotection><Registration/></Userloginpageprotection>} />
      <Route path="/home" element={<Usersiderouteprotection> <Userhome/> </Usersiderouteprotection>} />
      <Route path="/profile" element={<Usersiderouteprotection><Userprofile/></Usersiderouteprotection>} />
      <Route path="/preferences" element={<Usersiderouteprotection><Preferences/></Usersiderouteprotection>} />

      {/* other pages routers */}
      <Route path="/modal" element={ state ? <Modal /> :  <NotFoundPage/> }></Route>
      <Route path="*" element={<NotFoundPage/>}></Route>

    </Routes>
  );
}

export default UserRouter;
