import React, { useState, useRef } from 'react';
import styles from './OtpModal.module.css'; 
import apiClient from '../../../../../api/axiosconfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';




const Modal = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const [iserror,setiserror] = useState(false)
  const [iserror2,setiserror2] = useState(false)
  const [iserror3,setiserror3] = useState(false)
  const [isload,setIsload] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {email} = location.state || {}
  const handleChange = (element, index) => {

    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (e.target.previousSibling) {
          e.target.previousSibling.focus();
        }
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6){
      setiserror(true)
    }
    else{
      setIsload(true)
      setiserror(false)
      try{
        const response = await apiClient.post('/authapp/otpverification',{email,otpValue} ,{
          headers :{
  
          }
        });
        if (response.status === 201){
          setIsload(false)
          setiserror2(false)
        
          navigate('/user/userlogin',{state:{message:"Please login..."}})
        }
      } catch (error) {
        if (error.response.data.error === 'faild') {
          setIsload(false)
          setiserror2(true)
        }
        if (error.response.data.error === 'notpresent') {
          setIsload(false)
          setiserror3(true)

        }
         else {
          setIsload(false)
          console.log('An error occurred. Please try again.');
        }
      }
    }
  };
  if (iserror2 && iserror){
    setiserror2(false)
    setiserror(true)

  }


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2> Verify your email here!</h2>
        <p>Please enter the otp sent to your mail</p>
        <div className={styles.otpInputs}>
          {otp.map((data, index) => (
            <input
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={e => handleChange(e.target, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              onFocus={e => e.target.select()}
            />
          ))}
        </div>
        {iserror &&<div className='py-3 text-danger'>Enter complete otp</div>}
        {iserror2 && <div className='py-3 text-danger'>Enter currect otp</div>}
        {iserror3 &&<div className='py-3 text-danger'>User is not  present</div>}

        {isload ? (
                          <div className="spinner-container">
                            <ClipLoader size={30} color={"#123abc"} loading={isload} />
                          </div>
                        ) : ""}
        <div className={styles.modalButtons}>
          <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
         
        </div>
      </div>
    </div>
  );
};

export default Modal;
