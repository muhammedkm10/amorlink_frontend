import React, { useEffect, useState } from 'react'
import styles from './matchcomponents.module.css'
import image from '../../../../../assets/images/pppp.jpg'

import { Link } from 'react-router-dom'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'


function RequestedUsers() {
  const [requestedusers,setRequestedUsers] = useState([])

  // fetching requested users details for this user
  const fetchData  = async () =>{
    try{
      const response = await authentcatedApiClient.get(backendurls.matchrequests)
       
       if (response.data.message === "success"){
            setRequestedUsers(response.data.requested_users)
       }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect (()=>{
    
  fetchData()

  },[])
console.log(requestedusers)
  return (
      <div className={`container-fluid ${styles.fullbody}`}>
        {
          requestedusers.map((user)=>(
            <div className={`container ${styles.wrapper}`}> 
             <div className="row justify-content-evenly text-center">
             <div className={`col-lg-6 col-12 d-flex  align-items-center  ${styles.image}`}>
                
               { user.image_details ? (
                  <img src={`${import.meta.env.VITE_IMAGE}/${user.image_details}`} width="50px" className='d-block' height="50px" alt="" />
                ):(
                  <img src={image} width="50px" height="50px" alt="" />
                )
              }
                <h6  className='ms-5 text-white'>{user.name} </h6>


           </div>
           <div className={`col-lg-6 col-12 ${styles.details}`}>
               
                <div className='d-flex justify-content-center align-items-center col-12 mt-lg-0 mt-3 '>
                <Link ><button className={styles.button1}>accept</button></Link>
                <Link className='text-white ' to={`/shoeprofiles/${user.id}`}><button className={styles.showprofile}>show profile</button></Link>
                <button title="remove"  className={`fa fa-times fa-2x ms-lg-5 ms-3 ${styles.closebutton}`}></button>

                </div>
           </div>
                
             </div>
           
    </div>

          ))
        }
        
    </div>
  )
}

export default RequestedUsers