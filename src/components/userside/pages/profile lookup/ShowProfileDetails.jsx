import React, { useEffect, useState } from 'react'
import profile from '../../../../assets/images/pppp.jpg'
import styles from './showprofiledetails.module.css'
import { useParams } from 'react-router-dom'
import ReligionInformationLookup from './show profile components/ReligionInformationLookup'
import LocationLookup from './show profile components/LocationLookup'
import FamilyDetailsLookup from './show profile components/FamilyDetailsLookup'
import PartnerPreferencesLookup from './show profile components/PartnerPreferencesLookup'
import PhotoGallaryLookup from './show profile components/PhotoGallaryLookup'
import ProfessionaldetailsLookup from './show profile components/ProfessionaldetailsLookup'
import { authentcatedApiClient } from '../../../../api/axiosconfig'
import { backendurls } from '../../../../api/backendEndpoints'

function ShowProfileDetails() {
    const {id} = useParams()
    const [userdetails,setUserDetails] = useState({})


    // fetching user data
    useEffect (()=>{
        fetchUserData()
    },[])
    
    const fetchUserData = async () =>{
        try{
            const response = authentcatedApiClient.get(backendurls.profileshow , {
                headers :{
                    'user_id':id
                }
            })
            if (response.data.message === "success"){
                console.log(success)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    
  return (
    

<div>
    <div>ShowProfileDetails {id}</div> 
      <Homenavbar className={styles.afterbreakpoint}name={userdetails.username} page="home1" />
      <div className={styles.fullbody}>
        <div className={`container-fluid  ${styles.background}`}>
          
        </div>
      
        <div className={`container-fluid ${styles.head}`}>
          <div className="row">
            <div className={`col-md-6 col-12  p-0 ${styles.firstside}`}>
              {!usergallarydetails.image1 ? (
                <img src={profile} alt="" className={styles.profile} />
         
              ) : (
                <img
                  src={`${import.meta.env.VITE_IMAGE}${usergallarydetails.image1}`} 
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
                <Link className={styles.primarydetailseditbutton}>
                  <i  onClick={editMaindetails}className="fa fa-edit mt-5 text-white" title="Edit">
                    edit
                  </i>
                </Link>
              </div>
            <a href="#other details" className=' mt-5'>go to other details</a>

            </div>
          </div>


        </div>
        <div id="other details"className={styles.otherdetails}>
          <div className={styles.details}>
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
                    Your preferences
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
              <BasicDetails  />
            ) : null}
            {selectedItem === 'religion' && <ReligionInformationLookup />}
            {selectedItem === 'location' && <LocationLookup />}
            {selectedItem === 'family' && <FamilyDetailsLookup />}
            {selectedItem === 'preference' && <PartnerPreferencesLookup />}
            {selectedItem === 'gallary' && <PhotoGallaryLookup />}
            {selectedItem === 'profession' && <ProfessionaldetailsLookup />}
          </div>
        </div>
      </div>
    </div>
    
  )
  
}

export default ShowProfileDetails