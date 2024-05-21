import React from 'react'
import Userinput from '../../../common/Userinput'
import Userdropdown from '../../../common/Userdropdown'

function Step1({ data, handleChange, isEmailValid, isPhoneValid,isPasswordValid }) {
    const options = [
        { value: 'self', label: 'my self' },
        { value: 'daughter', label: 'my daughter' },
        { value: 'son', label: 'my son' },
        { value: 'sister', label: 'my sister' },
        { value: 'brother', label: 'my brother' },
        { value: 'friend', label: 'my friend' },

      ];
    
    console.log(data)
    console.log(isEmailValid)

  return (
    <div>
    <div className="inputs">
      <Userdropdown options={options} label="This account for" name="accountFor" value={data.accountFor} onChange={handleChange} />
      <Userinput placeholder="name" type="text" name="name" value={data.name} onChange={handleChange} />
      {!data.name && <div className="error">Enter  full name</div>}
      <Userinput placeholder="email" type="email" name="email" value={data.email} onChange={handleChange} />
      {!data.email || !isEmailValid && <div className="error">Invalid email</div>}
      <Userinput placeholder="phone" type="number" name="phone" value={data.phone} onChange={handleChange} />
      {!data.phone || !isPhoneValid && <div className="error">Invalid phone number</div>}
      <Userinput placeholder="password" type="password" name="password" value={data.password} onChange={handleChange} />
      {!data.password || !isPasswordValid && <div className="error">Invalid password</div>}
    </div>
  </div>
    
  )
}

export default Step1