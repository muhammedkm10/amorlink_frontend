import React,{useState,useEffect} from 'react'
import RegistatinNavbar from '../../layout/regnavbar'
import Registrationfooter from '../../layout/regfooter'
import loginimage from '../../../../assets/images/pexels-imagestudio-1488315.jpg'
import './userlogin.css'
import Userbutton from '../../common/Userbutton'
import Userinput from '../../common/Userinput'
import { Link, useAsyncError, useNavigate } from 'react-router-dom'
import { login } from '../../../../store/actions/authActions'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custom-toastify.css';
import { ClipLoader } from 'react-spinners';


function UserLogin() {
  const notify = (data) => toast.error(
    <div>
      <i className="fas  "></i>
      {data}
    </div>, 
    {
      className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
      progressClassName: 'custom-toast-progress',
    }
  );
  

  //  states using of the transition
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);


  const auth = useSelector((state)=>state.auth)
console.log("in login page",auth)
   const dispatch = useDispatch()




  // to fetch the data from the previous component
  const location = useLocation()
  const {message} = location.state || {}


  // states used to store the  form data
  const [formData1,setFormdata1] = useState({
    email:'',
    password:''
  })


// validation for the enterd email and password
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
      validatePassword(value)
    }
  }

  const validateEmail = (value) =>{
    const gmailRegex = /^(?! )[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setisEmailvalid(gmailRegex.test(value));

  }
  const validatePassword = (value) =>{
      // setIspasswordValid(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password));
      setidPasswordvalid(/^[a-zA-Z0-9]{6}$/.test(value));
    };


    const [loading, setLoading] = useState(false);
    const [isinvalid,setisinvalid] = useState(false)
    const Navigate = useNavigate()


    // for submitting the form for login
    const submitHandler = () => {
  if (!isemailvalid ||!ispasswordvalid) {
    notify("Please enter valid password and email");
  } else {
    setLoading(true);
    dispatch(login(formData1)).then((information) => {
      console.log(information, "asdkifhaksjdf");
      if (information === "hai") {
        setLoading(false);
        Navigate('/userhome');
      } else {
        // Handle other responses
        // Your existing logic for handling "notpossible" and "notverified" goes here
      }
    }).catch((error) => {
      // Handle errors
      console.error("Error occurred:", error);
      setLoading(false);
      Navigate('/userhome'); // Optionally navigate to user home on error
    });
  }
};



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
          <ToastContainer  position='top-center' />

            <div className={`login ${isVisible ? 'visible' : ''}`}>
              {message ? <div className='text-success'><p>Verification completed please login....</p></div>:""}
              <h4 className='heading'>Login</h4>
              <div className="loginform">
                <div className="inputs">
                  <Userinput placeholder="email" type="email" name="email"onChange={handleemailandpassword}/>
                  {!formData1.email || !isemailvalid && <div className="error">Invalid email</div>}
                  <Userinput placeholder="password" type="password" name="password"  onChange={handleemailandpassword}/>
                {!formData1.password || !ispasswordvalid && <div className="error"><p>Enter correct password</p></div>}
                 
                </div>
                <div className='loginbutton'>
                  <Userbutton name="login" onClick={submitHandler} />
                </div>
                {loading ? (
                          <div className="spinner-container">
                            <ClipLoader size={20} color={"#123abc"} loading={loading} />
                          </div>
                        ) : ""}
                {isinvalid && <p className='text-danger'>Please enter the correct email and password</p>}

                <div className='links'>
                    <span className='forget'> <Link >forget passwsord?   </Link>|  <Link  to="/usersignup">signup  </Link></span>
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