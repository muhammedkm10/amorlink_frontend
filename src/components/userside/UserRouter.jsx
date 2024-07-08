// UserRouter.js
import React, { Suspense } from 'react';
import UserLogin from './pages/loginpage/UserLogin';
import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from './pages/signuppage/Usersignup';
import Modal from './pages/signuppage/otp/otpmodal';
import Userhome from './pages/userhome/userhome';
import Usersiderouteprotection from '../../routprotections/Usersiderouteprotection';
import Userloginpageprotection from '../../routprotections/Userloginpageprotection';
import NotFoundPage from './UI/Error';
import { useSelector } from 'react-redux';
import ShowProfileDetails from './pages/profile lookup/ShowProfileDetails';
import Subscriptions from './pages/subscription management/Subscriptions';
import Thanks from './UI/Thanks';
import NotFoundPageforUser from './UI/UserNotFound';
import ChatPage from './pages/chat/chatPage';
import NotificationComponent from '../../utils/NotificationComponent';
import { ToastContainer, toast } from 'react-toastify' // Import react-toastify


const Userprofile = React.lazy(()=>import ('./pages/userprofile/Userprofile'))
const Preferences = React.lazy(()=>import ('./pages/preference/Preferences'))
const Matches = React.lazy(()=>import ('./pages/match request management/Matches'))





function UserRouter() {
  const state = useSelector(state=>state.otppage.isvisible)
  const user_id = localStorage.getItem('user_id')
  const excludePaths = ['/chat/:userId/:name']
  console.log('user routers is working','my user id is',user_id);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <NotificationComponent userId={user_id} excludePaths={excludePaths} />
    <Routes>
      {/* login router */}
      <Route path="" element={<Userloginpageprotection><UserLogin/></Userloginpageprotection>} />
      {/* other authentication need routes*/}
      <Route path="/usersignup" element={<Userloginpageprotection><Registration/></Userloginpageprotection>} />

      <Route path="/home" element={<Usersiderouteprotection> <Userhome/> </Usersiderouteprotection>} />
      <Route path="/profile" element={<Usersiderouteprotection><Userprofile/></Usersiderouteprotection>} />
      <Route path="/preferences" element={<Usersiderouteprotection><Preferences/></Usersiderouteprotection>} />
      <Route path="/shoeprofiles" element={<Usersiderouteprotection><ShowProfileDetails/></Usersiderouteprotection>} />
      <Route path="/matches" element={<Usersiderouteprotection><Matches/></Usersiderouteprotection>} />
      <Route path="/subscriptions" element={<Usersiderouteprotection><Subscriptions/></Usersiderouteprotection>} />
      <Route path="/thanks" element={<Usersiderouteprotection><Thanks/></Usersiderouteprotection>} />
      <Route path="/chat/:userId/:receiverId" element={<Usersiderouteprotection><ChatPage/></Usersiderouteprotection>} />
      {/* other pages routers */}
      <Route path="/modal" element={ state ? <Modal /> :  <NotFoundPage/> }></Route>
      <Route path="*" element={<NotFoundPageforUser/>}></Route>
      <Route path="/usernotfoundpage" element={<NotFoundPageforUser/>}></Route>
    </Routes>
    <ToastContainer position="bottom-right" closeOnClick pauseOnHover />

    </Suspense>

  );
}

export default UserRouter;
