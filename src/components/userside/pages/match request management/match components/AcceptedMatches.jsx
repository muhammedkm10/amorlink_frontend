import React, { useState,useEffect } from 'react'
import styles from './matchcomponents.module.css'
import image from '../../../../../assets/images/home fixed.jpg'
import {Link} from 'react-router-dom'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'



function AcceptedMatches() {
  const [matches,setMatches] = useState([])
  const [isLoading,setLoading] = useState(false)
  const [isremoved,setisremoved] = useState(false)



  // fetching requested users details for this user
  const fetchData  = async () =>{
    try{
      setLoading(true)

      const response = await authentcatedApiClient.get(backendurls.matchrequests,{
        headers:{
          'details':"matched"
        }
      })
       
       if (response.data.message === "success"){
                setLoading(false)

                setMatches(response.data.users)
       }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect (()=>{
    
  fetchData()

  },[isremoved])


  // removing from matched 

const RemoveFromMatches = async (userid) =>{
  const result = await Swal.fire({
    title: "do you wanto to remove?",
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Yes, proceed',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  });
  if (result.isConfirmed){
    try{

      const response = await authentcatedApiClient.delete(`${backendurls.matchrequests}/${userid}`)
      if (response.data.message === "success"){
  
        Swal.fire({
          title: "Match removed  successfully",
          icon: 'success',
      });
      setisremoved(!isremoved)
      }
  
    }
    catch(error){
      console.log(error)
    }

  }



}


console.log("matches",matches);
  return (
              <div className={`container ${styles.fullbody}`}>
               <div className="row col-3 col-12">
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
                {
                  !isLoading ? (
                    
                      matches &&  matches.length === 0 ?(
                          <p className='text-center text-white'>Oops.....!  There is no matches for you <Link to="/preferences">go to your preferences</Link></p>
                        ):(
                          
                          matches.map((user)=>(
                              <div className={`container col-lg-9 col-12 text-center ${styles.wrapper}`}> 
                              <div className="row justify-content-evenly text-center">
                              <div className={`col-lg-8 col-12 d-flex  align-items-center  ${styles.image}`}>
                                  
                                { user.image_details ? (
                                   <Link className='text-white' title='click here' to={`/shoeprofiles/${user.id}`}   state={{ comingfrom: "matched_page" }}> <img src={`${import.meta.env.VITE_IMAGE}${user.image_details}`} width="50px" className='d-block' height="50px" alt="" /></Link>
                                  ):(
                                    <Link className='text-white ' to={`/shoeprofiles/${user.id}`}   title='click here' state={{ comingfrom: "matched_page" }}><img src={image} width="50px" height="50px" alt="" /></Link>
                                  )
                                }
                                  <h6  className='ms-5 text-white'>{user.name} </h6>
                  
                  
                            </div>
                            <div className={`col-lg-4 col-12 ${styles.details}`}>
                                
                                  <div className='d-flex justify-content-center align-items-center col-12 mt-lg-0 mt-3 '>
                                    <button className={`fa fa-comment fa-2x  ${styles.chat}`}></button>
                                    <button  onClick={()=>RemoveFromMatches(user.id)} className={styles.button2}>Remove</button>
                  
                                  </div>
                            </div>
                                  
                              </div>
                            
                      </div>
                  
                            ))
                          
                        )
                      
                    

                  ):(
                  <div className="spinner-container d-flex justify-content-center p-5">
                    <ClipLoader size={30} color="#123abc" loading={isLoading} />
                  </div>
                  )
                }
                </div>
                  
                </div>
                
              
              
              
          </div>
  )
}

export default AcceptedMatches