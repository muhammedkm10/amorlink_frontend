import React,{useState,useEffect} from 'react'
import RegistatinNavbar from '../../layout/regnavbar'
import Registrationfooter from '../../layout/regfooter'
import loginimage from '../../../../assets/images/pexels-imagestudio-1488315.jpg'
import './userlogin.css'
import Userbutton from '../../common/Userbutton'
import Userinput from '../../common/Userinput'
import { Link } from 'react-router-dom'

function UserLogin() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <div className="wrapper">
    <RegistatinNavbar/>
    <main className="main"> 
      <div className='containerfluid'>
        <div className="row innerwrapper">
          <div className={`col-md-6 d-none d-md-block firstside ${isVisible ? 'visible' : ''}`}> 
            <img className="loginimage" src={loginimage} alt="Login" />
          </div>
          <div className='col-12 col-md-6 secondside'>
            <div className={`login ${isVisible ? 'visible' : ''}`}>
              <h4 className='heading'>Login</h4>
              <div className="loginform">
                <div className="inputs">
                  <Userinput placeholder="email" type="email"/>
                  <Userinput placeholder="password" type="password" />
                </div>
                <div className='loginbutton'>
                  <Userbutton name="login" />
                </div>
                <div className='links'>
                    <span className='forget'> <Link >forget passwsord?   </Link>|  <Link  to="/user/usersignup">signup  </Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div className={`footer-wrapper ${isVisible ? 'visible' : ''}`}>
      <Registrationfooter />
    </div>
  </div>
  )
}

export default UserLogin