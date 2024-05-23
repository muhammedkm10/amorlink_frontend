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
  const [formData1,setFormdata1] = useState({
    email:'',
    password:''
  })


  const [isemailvalid,setisEmailvalid] = useState(false)
  const [ispasswordvalid,setidPasswordvalid] = useState(false)

  const handleemailandpassword = (e) =>{
    const {name,value} = e.target;
    setFormdata1({
      ...formData1,
      [name]:value
    })
    if (name === 'email'){
      validateEmail(value)
    }
    else if (name === 'password'){
      validateName(value)
    }
  }

  const validateEmail = (value) =>{
    const gmailRegex = /^(?! )[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setisEmailvalid(gmailRegex.test(value));

  }
  const validateName = (value) =>{
      // setIspasswordValid(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password));
      setidPasswordvalid(/^[a-zA-Z0-9]{6}$/.test(value));
    };

  


  useEffect(() => {
    setIsVisible(true);
  }, []);

console.log(formData1)
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
                  <Userinput placeholder="email" type="email" name="email"onChange={handleemailandpassword}/>
                  {!formData1.email || !isemailvalid && <div className="error">Invalid email</div>}
                  <Userinput placeholder="password" type="password" name="password"  onChange={handleemailandpassword}/>
                  {!formData1.password || !ispasswordvalid && <div className="error">Invalid email</div>}

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