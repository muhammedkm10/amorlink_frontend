import React, { useState } from 'react'
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../userside/pages/loginpage/custom-toastify.css';
import RegistatinNavbar from '../../../userside/layout/regnavbar';
import Registrationfooter from '../../../userside/layout/regfooter';
import Userbutton from '../../../userside/common/Userbutton';
import Userinput from '../../../userside/common/Userinput';
import styles from  './AdminLogin.module.css'
import adminApiClient from '../../../../api/axiosconfig';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';





function AdminLogin() {

// notification handling
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

// handling email and password
    const [isemailvalid,setisEmailvalid] = useState(false)
    const [ispasswordvalid,setisPasswordvalid] = useState(false)
    const [formData2,setformdata] = useState({
        email:"",
        password:""
    })
    
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading,setLoading] = useState(false)
    const [isinvalid,setisinvalid] = useState(false)




    // handle email password
    const handleemailandpassword = (e) =>{
        const {name,value} = e.target
        setformdata(
            {...formData2,
                [name]:value
            })
            if (name === "email"){
                validateEmail(value)
            }
            else if(name === 'password'){
                validatePassword(value)
            }
    }


    //email validation  for the front end
    const  validateEmail = (value) =>{
        const gmailRegex = /^(?! )[a-zA-Z0-9._%+-]+@gmail\.com$/;
        setisEmailvalid(gmailRegex.test(value));
    
    }
    //  password validation for front end
    const validatePassword = (value) =>{
            // setIspasswordValid(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password));
            setisPasswordvalid(/^[a-zA-Z0-9]{5}$/.test(value));

    }




    // handle the submit
    const submitHandler = async () =>{
        if (!isemailvalid || !ispasswordvalid) {
            notify("Please enter valid password and email");
          }
          else{
            try{
                
              const response = await adminApiClient.post('/authapp/userlogin',formData2)
              setLoading(true)
              // if the response is success then the following code will work
              if (response.status === 200 && response.data.role === 'admin' ){
                setLoading(true)
                const resp = response.data
                adminApiClient.post('/authapp/api/token',  formData2)
                  .then((response)=>{
                    console.log(response.data)
                    const p = response.data
                    if (resp.role === "admin"){
                          localStorage.setItem("authAdminTokens", JSON.stringify(p))
                          localStorage.setItem("role","admin")
                          dispatch({type:"LOGIN SUCCESS",payload:{usertoken:null,admintoken:p,role:resp.role}})
                          Navigate('/admin/adminhome')
                    }
                  })
              }
              else{
                console.log(response);
              }
            }
            catch(error){
                if (error.response && error.response.data.error === "notpresent") {
                    setLoading(false)
                    setisinvalid(true)
                }
            }
          }
    }
    return (
        <div>
          <div className={styles.wrapper}>
            <RegistatinNavbar user="admin"/>
            <main className={`main ${styles.innerwrapper}`}>
              <div className={styles.containerfluid}>
                <ToastContainer position='top-center' />
                <div className={styles.secondside1}>
                  <div className={styles.login1}>
                    <h4 className={styles.heading1}>Admin login</h4>
                    <div className={styles.loginform1}>
                      <div className={styles.inputs1}>
                        <div className='p-4'>
                        <Userinput
                          placeholder="email"
                          type="email"
                          className="mx-4"
                          style={{ backgroundColor: "red", paddingLeft: "10px", paddingRight: "10px", marginTop: "10px" }}
                          name="email"
                          onChange={handleemailandpassword}
                        />
                        </div>
                        {!formData2.email || !isemailvalid && <div className={styles.error1}>Invalid email</div> }
                        <div className='p-4'>
                        <Userinput
                          placeholder="password"
                          type="password"
                          className="mx-4"
                          name="password"
                          onChange={handleemailandpassword}
                        />
                        </div>
                        {!formData2.password || !ispasswordvalid && <div className={styles.error1}><p>Enter correct password</p></div>}
                      </div>
                      <div className={styles.loginbutton}>
                        <Userbutton name="login" user="user"onClick={submitHandler} />
                      </div>
                      {loading ? (
                        <div className={styles['spinner-container']}>
                          <ClipLoader size={20} color={"#123abc"} loading={loading} />
                        </div>
                      ) : null}
                      {isinvalid ? <p className={styles['text-danger']}>Please enter the correct email and password</p> : null}
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Registrationfooter  user="admin"/>
          </div>
        </div>
      );
}

export default AdminLogin