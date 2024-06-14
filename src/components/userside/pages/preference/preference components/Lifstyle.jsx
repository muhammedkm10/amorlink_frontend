import React, { useEffect, useState } from 'react'
import styles from './preferecescomponents.module.css'
import image from '../../../../../assets/images/pppp.jpg'
import { Link } from 'react-router-dom'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import SubscriptionNeededModal from './SubscriptionNeededModal'



function Lifstyle() {

  const [userPreferences,setuserPreferences] = useState([])
  const [isLoading,setLoading] = useState(false)
  const [requested,setrequested] = useState(false)
  const [subscribed,setSubscribed] = useState(null)

  // subscription modal showing state
  const [isvisibleModal, setIsvisibleModal] = useState(false)


  // fetch data

  const fetchUsers = async () =>{

    try{
      setLoading(true)
      const  response = await authentcatedApiClient.get(backendurls.showpreference,{
        headers :{
          'details':'lifestyle'
        }
      })
      setLoading(false)
      setuserPreferences(response.data.users)
      setSubscribed(response.data.subscribed)

    }
    catch(error){
      console.log(error)
    }
   
  }

  useEffect (()=>{
     fetchUsers()
        
  },[requested])


  // handling match requests
  const matchRequestHandle  = async (id)=>{
    const result = await Swal.fire({
      title: "do you wanto request to match?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    });
    if (result.isConfirmed){
      try{
        const response = await authentcatedApiClient.post(`${backendurls.matchrequests}/${id}`)
        if (response.data.message === "success"){
          Swal.fire({
            title: "Request sent successfully",
            icon: 'success',
        });
        setrequested(!requested)
        }

      }
      catch(error){
        console.log(error)
      }

    }
    
   

       

  }


  return (
    <div className="row">
      {isvisibleModal && (
                <SubscriptionNeededModal modalvisiblefunction={setIsvisibleModal}/> 
              )}
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
              <Link to={`/shoeprofiles/${element.main_detail_of_user.id}`}  state={{ comingfrom: "preferences" }}><button className={styles.button1}>Go to Profile</button></Link>
              
                {!subscribed ? (
                   <Link  onClick={()=>setIsvisibleModal(true)} className='ms-2'><button className={styles.button3}><i className="fas fa-lock me-2 text-warning"></i>Request to match</button></Link>
                ):
                (
                  <Link  onClick={()=>matchRequestHandle(element.main_detail_of_user.id)} className='ms-2'><button className={styles.button1}>Request to match</button></Link>
                )
              }
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.goto_profile}><p>It looks like we don't have any matches for you at the moment. You can update your <Link to="/profile">profile preferences</Link></p></div>

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

export default Lifstyle