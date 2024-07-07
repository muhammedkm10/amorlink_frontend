import React, { useEffect, useState } from 'react'
import profile from '../../../../assets/images/ppti.png'
import styles from './showprofiledetails.module.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ReligionInformationLookup from './show profile components/ReligionInformationLookup'
import LocationLookup from './show profile components/LocationLookup'
import FamilyDetailsLookup from './show profile components/FamilyDetailsLookup'
import PartnerPreferencesLookup from './show profile components/PartnerPreferencesLookup'
import PhotoGallaryLookup from './show profile components/PhotoGallaryLookup'
import ProfessionaldetailsLookup from './show profile components/ProfessionaldetailsLookup'
import { authentcatedApiClient } from '../../../../api/axiosconfig'
import { backendurls } from '../../../../api/backendEndpoints'
import Homenavbar from '../../layout/Homenavbar'
import { Link,NavLink } from 'react-router-dom'
import { CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact'
import BasicDetailsLookup from './show profile components/UserbasicdetailsLookup'
import Swal from 'sweetalert2'
import SubscriptionNeededModal from '../preference/preference components/SubscriptionNeededModal'
import '../../../../assets/css/sweetalert-custom.css'


function ShowProfileDetails() {
    // const {id} = useParams()
    const [userdetails,setUserDetails] = useState({})
    const [userbasicdetails,setUserBasicDetails] = useState({})
    const [usergallaryDetails,setUsergallarydetails] = useState({})
    const [menuOpen, setMenuOpen] = useState(false) 
    const [selectedItem,setselectedItem] = useState(null)
    const navigate  = useNavigate()

    const [showSecondSide, setShowSecondSide] = useState(false);
    const location = useLocation();
    const { comingfrom,userid } = location.state || {};
    const [lookupuserid,setLookupuserid] = useState(userid)

    console.log("current user id",userid);
    // subscription taken or not 
    const [subscribed,setSubscribed] = useState(null)
  
      // subscription modal showing state
  const [isvisibleModal, setIsvisibleModal] = useState(false)

console.log(comingfrom,"i am coming from");

   
    
    const fetchUserData = async (id) =>{
      console.log("etho id",);
      try {
       const response = await authentcatedApiClient.get(backendurls.signup,{
          headers:{
            "lookupuserid":id,
            'type':'lookup'

          }
        })
        
          if (response.data.message === 'unauthorized') {
            navigate('/unauthorized')
          }
          if (response.data.message === 'success') {
            setUserDetails(response.data.user)
            setUserBasicDetails(response.data.basicdetails)
            setUsergallarydetails(response.data.usergallary)
            setSubscribed(response.data.subscribed)
            console.log("current data",userdetails);
            if (!response.data.subscribed){
              setIsvisibleModal(true)
            }

          }
        
      } catch (error) {
        console.log('error')
      }
    }
     // fetching user data
     useEffect (()=>{
      fetchUserData(lookupuserid)
  },[])

    // showing details based on the clicking in the second navbar
      const handSidebarItemsCick = (selected) => {
      setselectedItem(selected)
    }
  


    // toggle bar controlling
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
      }
    

      // match request sending to the backend

      const matchRequestHandle  = async ()=>{
        const result = await Swal.fire({
          title: "do you wanto request to match?",
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes, proceed',
          cancelButtonText: 'No, cancel',
          reverseButtons: true,
          customClass: {
            popup: 'swal-custom-container',
            title: 'swal-custom-title',
            icon: 'swal-custom-icon',
            confirmButton: 'swal-custom-confirm-button',
            cancelButton: 'swal-custom-cancel-button',
            actions: 'swal-custom-buttons-container',
            backdrop: `
                black
                center left
                no-repeat
              ` 
          }
        });
        if (result.isConfirmed){
          try{
            const response = await authentcatedApiClient.post(`${backendurls.matchrequests}/${userid}`)
            if (response.data.message === "success"){
              Swal.fire({
                title: "Request sent successfully",
                icon: 'success',
                customClass: {
                  popup: 'swal-custom-container',
                  title: 'swal-custom-title',
                  icon: 'swal-custom-icon',
                  confirmButton: 'swal-custom-confirm-button',
                  cancelButton: 'swal-custom-cancel-button',
                  actions: 'swal-custom-buttons-container',
                  backdrop: `
                      black
                      center left
                      no-repeat
                    ` 
                }
            });
            }
            navigate('/preferences')
  
          }
          catch(error){
            console.log(error)
          }
  
        }
        
       

           

      }
    console.log("subscription status",subscribed)
    
      const modalshowSubscribed = () => {
           setIsvisibleModal(true)

      }
  return (
    

<div >
      <Homenavbar className={styles.afterbreakpoint}  page="home1" />
      <div className={styles.fullbody}>
        <div className={`container-fluid  ${styles.background}`}>
          
        </div>
      
        <div className={`container ${styles.head}`}>
        
        {isvisibleModal && (
                 <SubscriptionNeededModal modalvisiblefunction={setIsvisibleModal}/> 
              )}
          <div className={`row ${styles.content}`}>
            <div className={`col-lg-6 col-12  p-0 ${styles.firstside}`}>
              {!usergallaryDetails.image1 ? (
                <img src={profile} alt="" className={styles.profile} />
         
               ) : (
                <img
                  src={`${import.meta.env.VITE_IMAGE}${usergallaryDetails.image1}`} 
                  alt="image1"
                  className={styles.profile}
                />
              )} 
            </div>


             


            <div className={`col-lg-6 col-12 ${showSecondSide ? `${styles.secondside} show` : styles.secondside}`}>
              <div className={styles.basic}>
                <h1 className={styles.name}>Hi, I am {userdetails.username}</h1>
                <h4>{userbasicdetails.age} years old</h4>
                <h4>India</h4>
              </div>

              <div className={styles.about}>
                <h3>About me</h3>
                <p>{userdetails.about_groom}</p>
               
              </div>

              {
                    ((comingfrom === "preferences") || (comingfrom === undefined))
                    && (
                        !subscribed? (
                          <Link  onClick={modalshowSubscribed} className='ms-2 '><button className={styles.button3}><i className="fas fa-lock me-2 text-warning"></i>Request to match</button></Link>

                        ) : (
                            <Link  onClick={matchRequestHandle} className='ms-2'><button className={styles.button1}>Request to match</button></Link>

                        )
                    )
                }
            <br />
             <br />
            <a href="#other details" className={styles.otherdetailslink}>other details</a>


            </div>
          </div>


        </div>
        <div  id="other details" className={styles.otherdetails}>
          <div  className={styles.details}>
            <div className={styles.wrapper}>
              <button className={styles.hamburger} onClick={toggleMenu}>
                <i className="fa fa-bars"></i>
              </button>
              <CDBSidebarMenu
                className={`${menuOpen ? styles.topnav : styles.show}`}
              >
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('basic')}
                    icon=""
                  >
                    Basic details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('religion')}
                    icon=""
                  >
                    Religional information
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('location')}
                    icon=""
                  >
                    Location Details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('family')}
                    icon=""
                  >
                    Family details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('preference')}
                    icon=""
                  >
                     Preference details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('profession')}
                    icon=""
                  >
                     Professional details
                  </CDBSidebarMenuItem>
                </NavLink>
                {!subscribed ? (
                   <NavLink
                   
                   activeClassName="activeClicked"
                   className={styles.links}
                 >
                   <CDBSidebarMenuItem
                     icon=""
                     onClick={modalshowSubscribed}
                   >
                     <span><i className='fas fa-lock text-warning me-1'></i></span><span className='text-warning'>Photos</span> 
                   </CDBSidebarMenuItem>
                 </NavLink>
                ) : (
                   <NavLink
                   activeClassName="activeClicked"
                   className={styles.links}
                 >
                   <CDBSidebarMenuItem
                     onClick={() => handSidebarItemsCick('gallary')}
                     icon=""
                   >
                      Photos
                   </CDBSidebarMenuItem>
                 </NavLink>
                )}
               
              </CDBSidebarMenu>
            </div>
          </div>

          <div  className={`container ${styles.showdetails}`}>
            {selectedItem === 'basic' || selectedItem === null ? (
              <BasicDetailsLookup  userid={lookupuserid} subscribed={subscribed}/>
            ) : null}
            {selectedItem === 'religion' && <ReligionInformationLookup userid={lookupuserid} subscribed={subscribed} />}
            {selectedItem === 'location' && <LocationLookup userid={lookupuserid} subscribed={subscribed} />}
            {selectedItem === 'family' && <FamilyDetailsLookup userid={lookupuserid} subscribed={subscribed} />}
            {selectedItem === 'preference' && <PartnerPreferencesLookup userid={lookupuserid}subscribed={subscribed}  />}
            {selectedItem === 'gallary' && <PhotoGallaryLookup userid={lookupuserid} subscribed={subscribed} />}
            {selectedItem === 'profession' && <ProfessionaldetailsLookup userid={lookupuserid} subscribed={subscribed} />}
          </div>
        </div>
      </div>
    </div>
    
  )
  
}

export default ShowProfileDetails