import React, { useEffect, useState } from 'react'
import profile from '../../../../assets/images/selfie.jpg'
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


function ShowProfileDetails() {
    const {id} = useParams()
    const [userdetails,setUserDetails] = useState({})
    const [userbasicdetails,setUserBasicDetails] = useState({})
    const [usergallaryDetails,setUsergallarydetails] = useState({})
    const [menuOpen, setMenuOpen] = useState(false) 
    const [selectedItem,setselectedItem] = useState(null)
    const navigate  = useNavigate()

    const [showSecondSide, setShowSecondSide] = useState(false);
    const location = useLocation();
    const { comingfrom } = location.state || {};
    console.log("coming from",comingfrom)
 



    // fetching user data
    useEffect (()=>{
        fetchUserData(id)
    },[])
    
    const fetchUserData = async (id) =>{
      try {
        authentcatedApiClient.get(backendurls.signup,{
          headers:{
            "userid":id
          }
        })
        .then((response) => {
          if (response.data.message === 'unauthorized') {
            navigate('/unauthorized')
          }
          if (response.data.message === 'Success') {
            setUserDetails(response.data.user)
            setUserBasicDetails(response.data.basicdetails)
            setUsergallarydetails(response.data.usergallary)
          }
        })
      } catch (error) {
        console.log('error')
      }
    }


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
            }
            navigate('/preferences')
  
          }
          catch(error){
            console.log(error)
          }
  
        }
        
       

           

      }
    
  return (
    

<div>
      <Homenavbar className={styles.afterbreakpoint}name={userdetails.username} page="home1" />
      <div className={styles.fullbody}>
        <div className={`container-fluid  ${styles.background}`}>
          
        </div>
      
        <div className={`container-fluid ${styles.head}`}>
          <div className="row">
            <div className={`col-md-6 col-12  p-0 ${styles.firstside}`}>
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
                comingfrom === "preferences" &&
            <Link className='m-3' onClick={matchRequestHandle}><button className={styles.button1}>Request to match</button></Link>

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
                    Your professional details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('gallary')}
                    icon=""
                  >
                    Your gallery
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </div>
          </div>

          <div  className={`container ${styles.showdetails}`}>
            {selectedItem === 'basic' || selectedItem === null ? (
              <BasicDetailsLookup  userid={id}/>
            ) : null}
            {selectedItem === 'religion' && <ReligionInformationLookup userid={id} />}
            {selectedItem === 'location' && <LocationLookup userid={id} />}
            {selectedItem === 'family' && <FamilyDetailsLookup userid={id} />}
            {selectedItem === 'preference' && <PartnerPreferencesLookup userid={id} />}
            {selectedItem === 'gallary' && <PhotoGallaryLookup userid={id} />}
            {selectedItem === 'profession' && <ProfessionaldetailsLookup userid={id} />}
          </div>
        </div>
      </div>
    </div>
    
  )
  
}

export default ShowProfileDetails