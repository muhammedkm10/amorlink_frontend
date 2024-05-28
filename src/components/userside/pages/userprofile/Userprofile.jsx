import React ,{useState,useEffect}from 'react'
import styles from './Userprofile.module.css'
import Homenavbar from '../../layout/Homenavbar'
import profile from  '../../../../assets/images/image.png'
import { useNavigate } from 'react-router-dom'
import { authentcatedApiClient } from '../../../../api/axiosconfig'
import { backendurls } from '../../../../api/backendEndpoints'

function Userprofile() {

  const [user,setUser] = useState({})
  const navigate = useNavigate()
  
  
  useEffect(()=>{
    try{
           authentcatedApiClient.get(backendurls.signup)
           .then((response)=>{
            if (response.data.message === "unauthorized"){
              navigate("/unauthorized")
            }
            if (response.data.message === "Success"){
              setUser(response.data.user)
            }
          })
          }
      catch(error){
            console.log("erroorrrrr")
      }
  },[])
  return (
    <div>
        <Homenavbar name={user.username}/>
        <div className={styles.fullbody}>
            <div className={`container ${styles.head}`}>
                    <div className="row ">
                        <div className={`col-md-6 col-12 ${styles.firstside}`}>
                             <img src={profile} alt="" className={styles.profile}/>
                        </div>
                        <div className={`col-md-6 col-12 ${styles.secondside}`}>
                                <div className={styles.basic}>
                                    <h1>{user.username}</h1>
                                    <h4>23 years old</h4>
                                    <h4>India</h4>
                                </div>
                                <div className={styles.location}>
                                      <h4>Software engineer</h4>
                                      <h5>Living in London</h5>
                                </div>
                                <div className={styles.about}>
                                  <h3>About me</h3>
                                    <p>{user.about_groom}</p>
                                </div>
                            </div>
                    </div>
                  
            </div>
        </div>
    </div>
  )
}

export default Userprofile