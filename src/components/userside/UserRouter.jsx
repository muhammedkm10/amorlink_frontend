// UserRouter.js
import React from 'react';
import UserLogin from './pages/loginpage/UserLogin';
import { Route, Routes } from 'react-router-dom';
import Registration from './pages/signuppage/Usersignup';
import Modal from './pages/signuppage/otp/otpmodal';
import Userhome from './pages/userhome/userhome';
import Userprofile from './pages/userprofile/Userprofile';
import Usersiderouteprotection from '../../routprotections/Usersiderouteprotection';
import Userloginpageprotection from '../../routprotections/Userloginpageprotection';
import Unauthorized from './UI/Unauthorized';


function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<Userloginpageprotection><UserLogin/></Userloginpageprotection>} />
      <Route path="/usersignup" element={<Userloginpageprotection><Registration/></Userloginpageprotection>} />
      <Route path="/userhome" element={<Usersiderouteprotection> <Userhome/> </Usersiderouteprotection>} />
      <Route path="/userprofile" element={<Usersiderouteprotection><Userprofile/></Usersiderouteprotection>} />
      <Route path="/modal" element={<Modal/>} />
      <Route path='/unauthorized' element={<Unauthorized/>}></Route>




    </Routes>
  );
}

export default UserRouter;
