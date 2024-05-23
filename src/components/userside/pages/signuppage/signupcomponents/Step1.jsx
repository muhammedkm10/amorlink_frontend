import React from 'react'
import Userinput from '../../../common/Userinput'
import Userdropdown from '../../../common/Userdropdown'

function Step1({ data, handleChange, isEmailValid, isPhoneValid,isPasswordValid ,isAccontforValid,isnameValid}) {
    const options = [
        {label :"This account for"},
        { value: 'self', label: 'my self' },
        { value: 'daughter', label: 'my daughter' },
        { value: 'son', label: 'my son' },
        { value: 'sister', label: 'my sister' },
        { value: 'brother', label: 'my brother' },
        { value: 'friend', label: 'my friend' },

      ];
    
      console.log(data)
   


  return (
    <div>
    <div className="inputs">
      <Userdropdown options={options}  name="accountFor" value={data.accountFor}  onChange={handleChange} />
      {data.accountFor ? <div className="text-info">Account for : {data.accountFor}</div>:""}
      { !isAccontforValid && <div className="error">Select one option</div> }
      <Userinput placeholder="name" type="text" name="name" value={data.name} onChange={handleChange} />
      {!data.name || !isnameValid &&<div className="error">Name must contain alphabets and inbetween spaces only</div>}
      <Userinput placeholder="email" type="email" name="email" value={data.email} onChange={handleChange} />
      {!data.email || !isEmailValid && <div className="error">Invalid email</div>}
      <Userinput placeholder="phone" type="number" name="phone" value={data.phone} onChange={handleChange} />
      {!data.phone || !isPhoneValid && <div className="error">Invalid phone number</div>}
      <Userinput placeholder="password" type="password" name="password" value={data.password} onChange={handleChange} />
      {!data.password || !isPasswordValid && <div className="error1">Your password needs to be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character</div>}
    </div>
  </div>
    
  )
}

export default Step1