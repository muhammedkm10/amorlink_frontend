import React from 'react'
import Usertextarea from '../../../common/Usertextarea'


function Step5({data,handleChange,isAbout}) {
 
  return (
    <div><h6>About the groom : </h6>
    <div className="inputs">
              {/* {!isAbout ? <Usertextarea  onChange={handleChange} name="about" /> : <div> {data.about} </div>} */}
              <Usertextarea  onChange={handleChange} name="about" value={data.about}/>
              {!isAbout && <div className="error">Text should contain at least 15 characters</div> }
  
    </div>
    </div>
  )
}

export default Step5
