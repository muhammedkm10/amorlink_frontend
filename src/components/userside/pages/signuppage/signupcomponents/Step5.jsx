import React from 'react'
import Usertextarea from '../../../common/Usertextarea'


function Step5({data,handleChange,isAbout}) {
  console.log(data)
  console.log(isAbout)
  return (
    <div><h6>About the groom : </h6>
    <div className="inputs">
              <Usertextarea  onChange={handleChange} name="about" />
              {!isAbout && <div className="error">Text should contain at least 15 characters</div> }
  
    </div>
    </div>
  )
}

export default Step5
