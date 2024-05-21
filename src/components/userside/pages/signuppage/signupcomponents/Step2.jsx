import React from 'react'
import Userinput from '../../../common/Userinput'

function Step2() {
  return (
    <div>
    <h1>2 page</h1>
    <div className="inputs">
              <Userinput placeholder="email" />
              <Userinput placeholder="password" />
    </div>
    </div>
  )
}

export default Step2