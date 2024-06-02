import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Homenavbar from '../../layout/Homenavbar'
import { authentcatedApiClient } from '../../../../api/axiosconfig'
import { useNavigate } from 'react-router-dom'
import styles from './Userhome.module.css'
import { backendurls } from '../../../../api/backendEndpoints'
import headimage from '../../../../assets/images/pexels-caio-45960.jpg'

function Userhome() {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      authentcatedApiClient.get(backendurls.signup).then((response) => {
        if (response.data.message === 'unauthorized') {
          console.log(response.data.message)
          navigate('/unauthorized')
        }
        if (response.data.message === 'Success') {
          setUser(response.data.user)
          dispatch({ type: 'userdetails', payload: response.data.user })
        }
      })
    } catch (error) {
      console.log('erroorrrrr')
    }
  }, [])
  return (
    <div className={styles.fullbody}>
        <Homenavbar name={user.username} />
            <div className={styles.main}>
                    <div className={`container-fluid ${styles.head}`}>
                        <div className={styles.para}>
                          <div>
                                <p className={styles.lines}>"In the garden of love, we plant seeds of trust and nurture them with patience, for a beautiful journey begins when hearts unite."
                               </p>
                          </div>
                               
                               <button className={styles.preferencebutton}>find your partner</button>
                        </div>
                    </div>
            </div>
    </div>
  )
}

export default Userhome
