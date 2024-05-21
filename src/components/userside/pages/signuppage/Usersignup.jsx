import React, { useState, useEffect } from 'react';
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

const Registration = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Initial form data structure
    name: '',
    email: '',
    phone: '',
   
  });


//   validation for the 1 st registration form
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPasswordValid, setIspasswordValid] = useState(false);


  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setIsEmailValid(gmailRegex.test(email));
  };

  const validatePhone = (phone) => {
    setIsPhoneValid(/^\d{10}$/.test(phone));
  };
  const validatePassword = (password) => {
    setIspasswordValid(/^[a-zA-Z0-9]{6}$/.test(password));
  };


//     going to next step if the credentials are valid
  const handleNextStep = () => {
    if (currentStep === 1 && (!isEmailValid || !isPhoneValid || !isPasswordValid)) {
      alert('Please fill out the form correctly');
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };


//     adding the data in the form using the state appending the values to form data
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
  };


//   changing the register page according to the validation
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 data={formData} handleChange={handleInputChange1} isEmailValid={isEmailValid} isPhoneValid={isPhoneValid} isPasswordValid={isPasswordValid}/>;
    //   case 2:
    //     return <Step2 data={formData} handleChange={handleInputChange2} />;
    //   case 3:
    //     return <Step3 data={formData} handleChange={handleInputChange} />;
    //   case 4:
    //     return <Step4 data={formData} handleChange={handleInputChange} />;
    //   case 5:
    //     return <Step5 data={formData} handleChange={handleInputChange} />;
      default:
        return <Step1 data={formData} handleChange={handleInputChange1} />;
    }
  };

  const isNextButtonDisabled = () => {
    if (currentStep === 1) {
      return !isEmailValid || !isPhoneValid;
    }
    return false;
  };

  return (
    <div className="wrapper">
      <RegistatinNavbar />
      <main className="main">
        <div className="containerfluid">
          <div className="row innerwrapper">
            <div className={`col-md-6 d-none d-md-block firstside ${isVisible ? 'visible' : ''}`}>
              <img className="loginimage" src={loginimage} alt="Login" />
            </div>
            <div className="col-12 col-md-6 secondside">
              <div className={`login ${isVisible ? 'visible' : ''}`}>
                <h4 className="heading">Provide your details</h4>
                <div className="loginform">
                  <div>{renderStep()}</div>
                  <div className="loginbutton">
                    <div>
                      {currentStep > 1 && <Userbutton onClick={handlePreviousStep} name="Previous" />}
                      {currentStep < 5 && <Userbutton onClick={handleNextStep} name="Next" disabled={isNextButtonDisabled()} />}
                      {currentStep === 5 && <Userbutton onClick={() => alert('Submit form data')} name="Submit" />}
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
  );
};

export default Registration;
