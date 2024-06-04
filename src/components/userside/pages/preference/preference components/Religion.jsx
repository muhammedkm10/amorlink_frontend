import React, { useEffect, useState } from 'react'
import styles from './preferecescomponents.module.css'
import image from '../../../../../assets/images/pppp.jpg'
import { Link } from 'react-router-dom'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import { ClipLoader } from 'react-spinners'


function Religion() {

  const [userPreferences,setuserPreferences] = useState([])
  const [isLoading,setLoading] = useState(false)
  

  // fetch data

  const fetchUsers = async () =>{

    try{
      setLoading(true)
      const  response = await authentcatedApiClient.get(backendurls.showpreference,{
        headers :{
          'details':'religion'
        }
      })
      setLoading(false)
      setuserPreferences(response.data.users)

    }
    catch(error){
      console.log(error)
    }
   
  }

  useEffect (()=>{
     fetchUsers()
        
  },[])
  return (
    <div className="row">
    <div className={`col-lg-3 col-12 ${styles.firstside}`}>
      <div className={styles.editprofile}>
            <h5 className={styles.head}>Change your preferences</h5>
            <p  className={styles.para}>By specifying your preferences clearly,
              the matchmaking algorithm can more effectively identify
                potential partners who share similar values, interests,
                and life goals. </p>
            <Link to='/profile'><button className={styles.profilelinking}>go to your profile</button></Link>
      </div>

    </div>
      
    <div className={`col-lg-9 col-12 ${styles.secondside}`}>
  {!isLoading? (
    <>
      {userPreferences.length > 0? (
        userPreferences.map((element) => (
          <div key={element.id} className={styles.card}>
            <img
              src={
                element.image.image1
                 ? `${import.meta.env.VITE_IMAGE}${element.image.image1}`
                  : image
              }
              className={`img-fluid ${styles.image}`}
              alt="User"
            />
            <div className={styles.cardBody}>
              <h1 className={`m-auto ${styles.cardTitle}`}>
                {element.main_detail_of_user.username || 'Unknown User'}
              </h1>
              <p className={styles.cardText}>
                {element.basice_details.age} years old
              </p>
              <p className={styles.cardText}>
                {element.basice_details.marital_status || 'Status Unknown'}
              </p>
              <p className={styles.cardText}>India</p>
              <div className="mt-4">
                <h5 className="fw-accordion">About me</h5>
                <p className={styles.cardText}>
                  {element.main_detail_of_user.about_groom || 'About groom unknown'}
                </p>
              </div>
              <div className={styles.buttonwrapper}>
                <button className={styles.button1}>Go to Profile</button>
                <Link className={styles.match}>
                  <i className={`fas fa-heart fa-2x ${styles.heart}`}></i>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.goto_profile}><p>No preferences change your preferences <Link to="/profile">to you  profile</Link></p></div>


      )}
    </>
  ) : (
    <div className="spinner-container d-flex justify-content-center p-5">
      <ClipLoader size={30} color="#123abc" loading={isLoading} />
    </div>
  )}
</div>

    
    
</div>
  )
}

export default Religion