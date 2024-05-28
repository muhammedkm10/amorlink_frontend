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


function UserRouter() {
  const state = useSelector(state=>state.otppage.isvisible)
  return (
    <Routes>
      <Route path="/" element={<Userloginpageprotection><UserLogin/></Userloginpageprotection>} />
      <Route path="/usersignup" element={<Userloginpageprotection><Registration/></Userloginpageprotection>} />
      <Route path="/userhome" element={<Usersiderouteprotection> <Userhome/> </Usersiderouteprotection>} />
      <Route path="/userprofile" element={<Usersiderouteprotection><Userprofile/></Usersiderouteprotection>} />
      <Route path="/modal" element={ state ? <Modal /> :  <NotFoundPage/> }></Route>
      <Route path="*" element={<NotFoundPage/>}></Route>

    </Routes>
  );
}

export default UserRouter;
