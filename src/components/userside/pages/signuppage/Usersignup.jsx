import React, { useState, useEffect} from 'react';
import Step1 from './signupcomponents/Step1';
import Step2 from './signupcomponents/Step2';
import Step3 from './signupcomponents/Step3';
import Step4 from './signupcomponents/Step4';
import Step5 from './signupcomponents/Step5';
import Userbutton from '../../common/Userbutton';
import RegistatinNavbar from '../../layout/regnavbar';
import Registrationfooter from '../../layout/regfooter';
import loginimage from '../../../../assets/images/pexels-imagestudio-1488315.jpg';
import { Link } from 'react-router-dom';
import './usersingnup.css';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custom-toastify.css';
import apiClient from '../../../../api/axiosconfig';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


const Registration = () => {
  const [isVisible, setIsVisible] = useState(false);
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
  


  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountFor: '',
    name: '',
    email: '',
    password:'',
    phone: '',
    dob:'',
    language:'',
    religion:'',
    cast:'',
    maritalStatus:'',
    height:'',
    familystatus:'',
    employed_in:'',
    annual_income:'',
    country:'india',
    state:'',
    district:'',
    about:''


   
  });



//     going to next step if the credentials are valid 
  const handleNextStep = () => {
    
    // if (currentStep === 1 && (!isEmailValid || !isPhoneValid || !isPasswordValid || !isAccontforValid || !isnameValid)) {
    //   notify("Fill the form correctly.....!")
    //   return;
    // }else  if (currentStep === 2 && (!isLanguagevalid || !isReligionvalid || !isCastvalid || !isDatevalid )) {
    //   notify("Fill the form correctly.....!")
    //   return;
    // }
    //  else if (currentStep === 3 && (!isFamilystatus || !isHeightvalid || !isMaritalstatus )){
    //   notify("Fill the form correctly.....!")
    //   return
    // }
    // else if (currentStep === 4 && (!isAnnualincome || !isDistrict || !isState || !isEmployedin)){
    //   notify("Fill the form correctly.....!")
    //     return
    //   }
    // else 
    if (currentStep === 5 ){
      notify("Fill the form correctly.....!")
       return 
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };





//   validation for the 1 st registration form
const [isnameValid, setIsnameValid] = useState(false);
const [isEmailValid, setIsEmailValid] = useState(false);
const [isPhoneValid, setIsPhoneValid] = useState(false);
const [isPasswordValid, setIspasswordValid] = useState(false);
const [isAccontforValid,setIsAccontforValid] = useState(false)
 
const validatename = (name) => {
  const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  setIsnameValid(nameRegex.test(name));
};

const validateEmail = (email) => {
  const gmailRegex = /^(?! )[a-zA-Z0-9._%+-]+@gmail\.com$/;
  setIsEmailValid(gmailRegex.test(email));
};

const validatePhone = (phone) => {
  setIsPhoneValid(/^\d{10}$/.test(phone));
};


const validatePassword = (password) => {
  console.log(password)
  // setIspasswordValid(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password));
  setIspasswordValid(/^[a-zA-Z0-9]{6}$/.test(password));
};


const validateAccountfor = (accountFor) =>{
if (accountFor){
setIsAccontforValid(true)
}
}





//     adding the data in the form using the state appending the values to form data for the 1st signup stage
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'phone') {
      validatePhone(value);
    }
    else if (name === 'password') {
        validatePassword(value);
      }
      else if (name === 'accountFor') {
        validateAccountfor(value);
      }
      else if (name === 'name') {
        validatename(value);
      }
  };

  // validation for the 2nd registation page
const [isDatevalid,setDatevalid] = useState(false)
const [isReligionvalid,setReligionvalid] = useState(false)
const [isLanguagevalid,setLanguagevalid] = useState(false)
const [isCastvalid,setCastvalid] = useState(false)


const validateLanguage = (language) =>{
  if(language){
    setLanguagevalid(true)
  }
}
const validateReligion = (religion) =>{
  if (religion){
    setReligionvalid(true)
  }
}
const validateCast= (cast) =>{
  if (cast){
    setCastvalid(true)
  }
}
const validateDob = (dob) =>{
  if(dob){
    let inputDate = new Date(dob);
    let currentdate = new Date();
    let datebefore18 =  new Date()
    datebefore18.setFullYear(currentdate.getFullYear() - 18);
    setDatevalid(inputDate <= datebefore18)
  }
}


//     adding the data in the form using the state appending the values to form data for the 2nd signup stage

  const handleInputChange2=(e)=>{
    const {name , value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "language"){
           validateLanguage(value)
    }
    else if (name === 'religion'){
           validateReligion(value)
    }
    else if(name === 'cast'){
            validateCast(value)
    }
    else if (name === 'dob'){
       validateDob(value)
    }
  }





// validation for third registration form

const [isMaritalstatus,setMaritalstatus] = useState(false)
const [isHeightvalid,setHeightvalid] = useState(false)
const [isFamilystatus,setFamilystatus] = useState(false)


const handleInputChange3 = (e)=>{
  const {name ,value} = e.target;
  setFormData({
    ...formData,
    [name]:value,
  })
  if (name === 'maritalStatus'){
    validateMaritalstatus(value)

  }
  else if(name === 'height'){
    validateHeight(value)
  }
  else if(name === 'familystatus'){
    validateFamilystatus(value)
  }
}


const validateMaritalstatus = (value)=>{
  if(value){
    setMaritalstatus(true)
  }
}
const validateHeight = (value)=>{
  if(value){
    setHeightvalid(true)
  }
}
const validateFamilystatus = (value)=>{
  if(value){
    setFamilystatus(true)
  }
}


// validation for the fourth registation form
const [isEmployedin,setEmployedin] = useState(false)
const [isAnnualincome,setAnnualincome] = useState(false)
const [isState,setState] = useState(false)
const [isDistrict,setDistrict] = useState(false)


const handleInputChange4 = (e)=>{
  const {name ,value} = e.target;
  setFormData({
    ...formData,
    [name]:value,
  })

  if (name === 'employed_in'){
    validateemployed_in(value)
  }
  else if(name === 'annual_income'){
    validateannual_income(value)
  }
  else if(name === 'state'){
    validatestate(value)
  }
  else if(name === 'district'){
    validatedistrict(value)
  }
}

const validateemployed_in = (value) =>{
  if (value){
    setEmployedin(true)
  }

}
const validateannual_income = (value) =>{
  if (value){
    setAnnualincome(true)
  }
  
}
const validatestate = (value) =>{
  if (value){
    setState(true)
  }
}
const validatedistrict = (value) =>{
  if (value){
    setDistrict(true)
  }
  
}


// validation for the fifth  registration form
const [isAbout,setisAbout] = useState(false)

const handleInputChange5 = (e)=>{
  const {name ,value} = e.target;
  setFormData({
    ...formData,
    [name]:value,
  })
  if (name === 'about'){
    validateAbout(value)
  }
}

const validateAbout = (value) =>{
  if (value.length >= 15) {
    setisAbout(true);
  } else {
    setisAbout(false);
  }
}



//   changing the register page according to the validation
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 data={formData} handleChange={handleInputChange1} isEmailValid={isEmailValid} isPhoneValid={isPhoneValid} isPasswordValid={isPasswordValid} isAccontforValid={isAccontforValid} isnameValid={isnameValid}/>;
      case 2:
        return <Step2 data={formData} handleChange={handleInputChange2} isLanguagevalid={isLanguagevalid} isReligionvalid={isReligionvalid} isCastvalid={isCastvalid} isDatevalid={isDatevalid} />;
      case 3:
        return <Step3 data={formData} handleChange={handleInputChange3} isMaritalstatus={isMaritalstatus} isHeightvalid={isHeightvalid} isFamilystatus={isFamilystatus}/>;
      case 4:
        return <Step4 data={formData} handleChange={handleInputChange4} isAnnualincome={isAnnualincome} isEmployedin={isEmployedin} isState={isState} isDistrict={isDistrict}/>;
      case 5:
        return <Step5 data={formData} handleChange={handleInputChange5} isAbout={isAbout} />;
      default:
        return <Step1 data={formData} handleChange={handleInputChange1}  isEmailValid={isEmailValid} isPhoneValid={isPhoneValid} isPasswordValid={isPasswordValid} isAccontforValid={isAccontforValid} isnameValid={isnameValid}/>;
    }
  };

//    submitting all form and going to the otp verification

const navigate = useNavigate()
const [loading, setLoading] = useState(false);


const submitHandler = async () => {
  if (!isAbout) {
    notify("Fill the form correctly....!");
  } else {
    setLoading(true);
    try {
      const response = await apiClient.post('/authapp/usersignup',formData ,{
        headers :{

        }
      }); // Replace '/endpoint' with your actual endpoint
      if (response.status === 201){
        
        navigate('/user/modal',{state:{email:formData.email}})
      }
    } catch (error) {
      if (error.response.data.error === 'emailused') {
        notify('Your email is already used');
      }
      else if (error.response.data.error === 'phonenumber') {
        notify('Phone number should be length of 10');
      } else {
        notify('An error occurred. Please try again.');
      }
    }
  }
};


 
       // basic skeleton of the registration form and  restructuring the pages here 

  return (
    <div>
   
    <div  className='wrapper'>
    <RegistatinNavbar />
    <main className="main">
      <div className="containerfluid">
        <div className="row innerwrapper">
          <div className={`col-md-6 d-none d-md-block firstside ${isVisible ? 'visible' : ''}`}>

            <img className="loginimage" src={loginimage} alt="Login" />
          </div>
          <div className="col-12 col-md-6 secondside">
          <ToastContainer  position='top-center' />
            <div className={`login ${isVisible ? 'visible' : ''}`}>
              <h4 className="heading">Provide your details</h4>
              <div className="loginform">
                <div>{renderStep()}</div>
                <div className="loginbutton">
                  <div>
                    {currentStep > 1 && <Userbutton onClick={handlePreviousStep} name="Previous" />}
                    {currentStep < 5 && <Userbutton onClick={handleNextStep} name="Next" />}
                    {currentStep === 5 && <Userbutton onClick={submitHandler} name="Submit" />}
                    {loading ? (
                          <div className="spinner-container">
                            <ClipLoader size={30} color={"#123abc"} loading={loading} />
                          </div>
                        ) : ""}
                    
                  </div>
                </div>
              </div>
              <div className="links">
                <span className="forget">
                  Your have account? <Link to="/user/userlogin">login</Link>
                </span>
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
  
  </div>

   
  );
};

export default Registration;
