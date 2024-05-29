import React ,{useState,useEffect}from 'react'
import styles from './Userprofile.module.css'
import Homenavbar from '../../layout/Homenavbar'
import profile from  '../../../../assets/images/pppp.jpg'
import { useNavigate } from 'react-router-dom'
import { authentcatedApiClient } from '../../../../api/axiosconfig'
import { backendurls } from '../../../../api/backendEndpoints'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import BasicDetails from './Userdetailcomponents/Userbasicdetails.jsx'
import ReligionInformation from './Userdetailcomponents/ReligionInformation.jsx'
import FamilyDetails from './Userdetailcomponents/FamilyDetails.jsx'
import PartnerPreferences from './Userdetailcomponents/PartnerPreferences.jsx'
import PhotoGallary from './Userdetailcomponents/PhotoGallary.jsx'
import Location from './Userdetailcomponents/Location.jsx'
import Professionaldetails from './Userdetailcomponents/Professionaldetails.jsx'



function Userprofile() {

  const [userdetails,setUserdetails] = useState({})
  const [userbasicdetails,setUserbasicdetails] = useState({})
  const [usergallarydetails,setUsergallarydetails] = useState({})

  const navigate = useNavigate()
  
  // fetching the data about the use when the user going to their profile
  useEffect(()=>{
    try{
           authentcatedApiClient.get(backendurls.signup)
           .then((response)=>{
            if (response.data.message === "unauthorized"){
              navigate("/unauthorized")
            }
            if (response.data.message === "Success"){
              setUserdetails(response.data.user)
              setUserbasicdetails(response.data.basicdetails)
              setUsergallarydetails(response.data.usergallary)
            }
          })
          }
      catch(error){
            console.log("erroorrrrr")
      }
  },[])



  // handle side bars clicking and setting the state 
  const [selectedItem,setSelection] = useState(null)
  const handSidebarItemsCick = (selected) =>{
    setSelection(selected)
  }
  return (
    // first part of the profile showing the main details about the user 
    <div>
        <Homenavbar name={userdetails.username}/>
        <div className={styles.fullbody}>
            <div className={`container ${styles.head}`}>
                    <div className="row ">
                        <div className={`col-md-6 col-12 ${styles.firstside}`}>
                          {!usergallarydetails.image1 ?   <img src={profile} alt="" className={styles.profile}/>:  <img src={usergallarydetails.image1} alt="image1" className={styles.profile}/>}
                           
                        </div>
                        <div className={`col-md-6 col-12 ${styles.secondside}`}>
                                <div className={styles.basic}>
                                    <h1>{userdetails.username}</h1>
                                    <h4>{userbasicdetails.age} years old</h4>
                                    <h4>India</h4>
                                </div>
                                <div className={styles.location}>
                                      <h4>{userbasicdetails.mother_toungue}</h4>
                                      <h5>{userbasicdetails.marital_status}</h5>
                                </div>
                                <div className={styles.about}>
                                  <h3>About me</h3>
                                    <p>{userdetails.about_groom}</p>
                                </div>
                            </div>
                    </div>
                  
            </div>
        {/* showing other details of the use and the side bar code also */}

            <div className={styles.otherdetails}>
                    <div className={styles.details}> <div
                            className={styles.wrapper}
                            >
                              <CDBSidebar textColor="#fff" className={styles.sidebar1}>
                                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                                  <a
                                    href="/"
                                    className="text-decoration-none"
                                    style={{ color: 'inherit' }}
                                  >
                                    Sidebar
                                  </a>
                                </CDBSidebarHeader>

                                <CDBSidebarContent className="sidebar-content">
                                  <CDBSidebarMenu  className={styles.contents}>
                                    <NavLink  activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={()=> handSidebarItemsCick("basic")} icon="">Basic details</CDBSidebarMenuItem></NavLink>
                                    <NavLink  activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={()=> handSidebarItemsCick("religion")}icon="">Religional information</CDBSidebarMenuItem></NavLink>
                                    <NavLink  activeClassName="activeClicked"className={styles.links} ><CDBSidebarMenuItem onClick={()=> handSidebarItemsCick("location")}icon=""> Groom’s Location</CDBSidebarMenuItem></NavLink>
                                    <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={()=> handSidebarItemsCick("family")}icon="">Family details</CDBSidebarMenuItem></NavLink>
                                    <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={()=> handSidebarItemsCick("preference")}icon=""> you preferences</CDBSidebarMenuItem></NavLink>
                                    <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={()=> handSidebarItemsCick("profession")}icon="">Your professional details</CDBSidebarMenuItem></NavLink>
                                    <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={()=> handSidebarItemsCick("gallary")}icon="">Your gallary</CDBSidebarMenuItem></NavLink>

                                  </CDBSidebarMenu>
                                </CDBSidebarContent>
                                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                                  <div style={{ padding: '20px 5px', }}>
                                  </div>
                                </CDBSidebarFooter>
                              </CDBSidebar>
                            </div>
                    </div>
                    <div className={`${styles.showdetails}`}>
                               {selectedItem === "basic" || selectedItem === null ? <BasicDetails /> : null}
                                {selectedItem === "religion" && <ReligionInformation/>} 
                                {selectedItem === "location" && <Location/>}
                                 {selectedItem === "family" && <FamilyDetails/>}
                                {selectedItem === "preference" && <PartnerPreferences/>}
                                {selectedItem === "gallary" && <PhotoGallary/>}
                                {selectedItem === "profession" && <Professionaldetails/>} 
                    </div> 
         
            </div>
        </div>
    </div>
  )
}

export default Userprofile