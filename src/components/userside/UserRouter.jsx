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
import ShowProfileDetails from './pages/profile lookup/ShowProfileDetails';
import Matches from './pages/match request management/Matches';
import Subscriptions from './pages/subscription management/Subscriptions';
import Thanks from './UI/Thanks';
import NotFoundPageforUser from './UI/UserNotFound';


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
      <Route path="/shoeprofiles/:id" element={<Usersiderouteprotection><ShowProfileDetails/></Usersiderouteprotection>} />
      <Route path="/matches" element={<Usersiderouteprotection><Matches/></Usersiderouteprotection>} />
      <Route path="/subscriptions" element={<Usersiderouteprotection><Subscriptions/></Usersiderouteprotection>} />
      <Route path="/thanks" element={<Usersiderouteprotection><Thanks/></Usersiderouteprotection>} />







      {/* other pages routers */}
      <Route path="/modal" element={ state ? <Modal /> :  <NotFoundPage/> }></Route>
      <Route path="*" element={<NotFoundPage/>}></Route>
      <Route path="/usernotfoundpage" element={<NotFoundPageforUser/>}></Route>


    </Routes>
  );
}

export default UserRouter;
