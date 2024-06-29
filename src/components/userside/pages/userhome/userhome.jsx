import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Homenavbar from '../../layout/Homenavbar'
import { authentcatedApiClient } from '../../../../api/axiosconfig'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Userhome.module.css'
import { backendurls } from '../../../../api/backendEndpoints'
import ReviewCard from './review card/ReviewCard'
import image1 from '../../../../assets/images/selfie.jpg'
import image2 from '../../../../assets/images/give details.jpeg.png'
import { ToastContainer } from 'react-toastify'


function Userhome() {
  const [user, setUser] = useState({})
  const [isvisibleModal, setIsvisibleModal] = useState(false)
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


  useEffect(() => {
    let intervalId;

    if (!user.subscribed) {
      intervalId = setInterval(() => {
        setIsvisibleModal(true);
        console.log('Showing modal for non-subscribed user');
      }, 10000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user.subscribed]);



  
  console.log(user);



  return (
    <div className={styles.fullbody}>
        <Homenavbar  page={"home"}  /> 
        {/* header part of the home */}
       
            <div className={styles.main}>
            {isvisibleModal && (
                 <div className={styles.modal}>
                 <div className={styles.modal_content}>
                   <h3 className='text-warning'>🌟 Why Upgrade to a Premium Subscription? 🌟</h3>
                    <p className={styles.para_for_subscription}> At AmorLink, we believe that finding a meaningful and lasting relationship should be an enriching and enjoyable experience. Our free membership provides access to basic features and services, but by upgrading to our Premium Subscription, you unlock a suite of exclusive benefits designed to enhance your journey towards love and companionship. </p>

                  <div className={`${styles.buttonContainer} p-3 `}>
                    <button id={styles.fileinput} className={styles.modal_close} onClick={()=>setIsvisibleModal(false)}>close</button>
                    <Link to="/subscriptions"><button id={styles.fileinput} className={styles.modal_close1} >go to our plans</button></Link>
                  </div>

 
                 </div>
               </div>
              )}
                    <div className={`container-fluid ${styles.head}`}>
                         <div className="row">
                            <div className={`col-lg-5 col-12 ${styles.firstside}`}>
                            <div className={styles.para}>
                              <p className={styles.lines}>"In the garden of love, we plant seeds of trust and nurture them with patience, for a beautiful journey begins when hearts unite."
                              </p>

                              <Link to = "/preferences"><button  className={styles.preferencebutton}>find your partner</button></Link>
                              </div>

                            </div>
                            <div className={`col-lg-7 col-12 ${styles.secondside}`}>
                             <div className={styles.secondsidephotodiv}>
                              
                             </div>
 
                            </div>
                         </div>
                    </div>
                     {/* welcome part */}
                    <div className={`container-fluid ${styles.about}`}>
                           <div className={styles.welcome}>
                               <h2 className={styles.heading1}>Welcome Amorlink</h2>
                               <p className={styles.welcomecontent}>AmorLink is your trusted partner in the journey of love and meaningful relationships. We offer a safe, user-friendly platform where individuals can find their perfect match based on shared values, interests, and life goals. Our goal is to make the process of finding love and companionship as seamless and enjoyable as possible.</p>

                           </div>
                    </div>


                     {/* complete profile  */}
                    <div className={`container-fluid ${styles.complete_profile}`}>
                    <h2 className={`${styles.heading2} p-5 text-white text-center`}>Complete Your profile</h2>
                           <div className={`container-fluid ${styles.editprofilewrapper}`}>

                             <div className="row p-5">
                              <div className={`col-md-5 col-12  ${styles.give_details}`}>
                              <div className="row">
                                        <div className="col-6 d-flex justify-content-center align-content-center mt-5">
                                          <img src={image1} alt="" width="100px" height="100px" />
                                        </div>
                                        <div className="col-6  text-center  justify-content-center align-content-center mt-5 ">
                                          <p>Upload clear, recent photos to help others get to know you better and increase your chances of finding a meaningful connection</p>
                                        <Link to = "/profile"><button  className={styles.preferencebutton}>Go to profile</button></Link>
                                        </div>
                                  </div>
                                        
                              </div>
                              <div className={`col-md-5 col-12 mt-md-0 mt-3 ${styles.preferences}`}>
                              <div className="row">
                                    <div className="col-6 d-flex justify-content-center align-content-center mt-5">
                                          <img src={image2} alt="" width="100px" height="100px" />
                                        </div>
                                        <div className="col-6 text-center justify-content-center align-content-center mt-5">
                                          <p>Enhance your chances of finding your perfect match by adding all other details to your profile</p>
                                        <Link to = "/profile"><button  className={styles.preferencebutton}>Go to profile</button></Link>
                                          
                                        </div>
                                        </div>

                              </div>
                             </div>
                             </div>

                    </div> 


                    {/* servieces and feature of amorlink */}
                    <div className={`container-fluid p-0 ${styles.forbodybackground}`}>
                      <h2 className={`${styles.heading2} p-5 text-white text-center`}>Find You'r partner with us...!</h2>
                         <div  className={`container-fluid bg-white ${styles.features}`}>
                          <div className="row">
                            <div className={`col-md-6 p-0 ${styles.featuresfirstpart}`}>
                              <div className={styles.image_wrapper}></div>
                            </div>
                             <div className={`col-md-6 p-0 ${styles.featuressecondpart}`}>
                               <div className={`container ${styles.wrapper_feature}`} >
                                 <div className={`row ${styles.row_wrapper}`} >

                                      <div className={`col-lg-4 col-12 ${styles.feature1}`}>
                                            <i className="fas fa-user p-2"></i>
                                            <h5 className='p-2' >Profile Creation</h5>
                                            <p> Create a personalized profile to share your story, interests, and preferences with potential matches.</p>
                                      </div>
                                      <div className={`col-lg-4 col-12 ${styles.feature1}`}>
                                            <i className="fas fa-users p-2"></i>
                                            <h5  className='p-2'>Matchmaking</h5>
                                            <p>  Utilize our advanced matchmaking algorithm to find compatible matches based on your preferences.</p>
                                      </div>
                                      <div className={`col-lg-4 col-12 ${styles.feature1}`}>
                                             <i className="fas fa-phone p-2"></i>
                                             <h5 className='p-2'>Customer Support</h5>
                                             <p>  Our dedicated customer support team is available to assist you with any questions or concerns you may have while using AmorLink.</p>
                                      </div>
                                      <div className={`col-lg-4 col-12 ${styles.feature1}`}>
                                             <i className="fas fa-search p-2"></i> 
                                             <h5  className='p-2'>Search and Filters</h5>
                                             <p> Discover potential matches through our easy-to-use search and filter features, allowing  to filter results based   location, education etc</p>
                                      </div>
                                </div>
                                </div>                                  
                             </div>
                          </div>

                         </div>

                         {/* review  section */}
                         <h2 className={`${styles.heading2} p-5 text-white text-center`}>Reviews</h2>
                         <Link className={` p-5 text-white text-center `}>add your review</Link>

                         <div className={`container-fluid  p-3 ${styles.review_part}`}>
                             <ReviewCard name="askdjfha"  review="aksjdf" rating={4} date={"12/2/2021"} />
                             <ReviewCard name="askdjfha"  review="aksjdf" rating={4} date={"12/2/2021"} />
                             <ReviewCard name="askdjfha"  review="aksjdf" rating={4} date={"12/2/2021"} />
                             <ReviewCard name="askdjfha"  review="aksjdf" rating={4} date={"12/2/2021"} />
                             <ReviewCard name="askdjfha"  review="aksjdf" rating={4} date={"12/2/2021"} />
                             <ReviewCard name="askdjfha"  review="aksjdf" rating={4} date={"12/2/2021"} />
                             <ReviewCard name="askdjfha"  review="aksjdf" rating={4} date={"12/2/2021"} />
                             <ReviewCard name="askdjfha"  review="aksjdf" rating={4} date={"12/2/2021"} />
                         </div>

                         <div className={styles.smallfooter}></div>


                    </div>
                   
                    



            </div>
    </div>
  
  )
}

export default Userhome


