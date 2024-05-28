import React from 'react'
import Usertextarea from '../../../common/Usertextarea'


function Step5({data,handleChange,isAbout}) {
 
  return (
    <div><h6>About the groom : </h6>
    <div className="inputs">
              <Usertextarea  onChange={handleChange} name="about" value={data.about}/>
              {!isAbout ?<div className="error">Text should contain at least 30 characters</div> :<p className='text-info p-0'>press submit for email verification</p>}
    </div>
    </div>
  )
}

export default Step5
