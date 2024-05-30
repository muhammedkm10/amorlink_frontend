import React, { useState, useEffect } from 'react';
import styles from './Userprofile.module.css';
import Homenavbar from '../../layout/Homenavbar';
import profile from '../../../../assets/images/pppp.jpg';
import { useNavigate } from 'react-router-dom';
import { authentcatedApiClient } from '../../../../api/axiosconfig';
import { backendurls } from '../../../../api/backendEndpoints';
import {
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import BasicDetails from './Userdetailcomponents/Userbasicdetails.jsx';
import ReligionInformation from './Userdetailcomponents/ReligionInformation.jsx';
import FamilyDetails from './Userdetailcomponents/FamilyDetails.jsx';
import PartnerPreferences from './Userdetailcomponents/PartnerPreferences.jsx';
import PhotoGallary from './Userdetailcomponents/PhotoGallary.jsx';
import Location from './Userdetailcomponents/Location.jsx';
import Professionaldetails from './Userdetailcomponents/Professionaldetails.jsx';





function Userprofile() {
  const [userdetails, setUserdetails] = useState({});
  const [userbasicdetails, setUserbasicdetails] = useState({});
  const [usergallarydetails, setUsergallarydetails] = useState({});
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu visibility

  const navigate = useNavigate();

  useEffect(() => {
    try {
      authentcatedApiClient.get(backendurls.signup)
        .then((response) => {
          if (response.data.message === "unauthorized") {
            navigate("/unauthorized");
          }
          if (response.data.message === "Success") {
            setUserdetails(response.data.user);
            setUserbasicdetails(response.data.basicdetails);
            setUsergallarydetails(response.data.usergallary);
          }
        });
    } catch (error) {
      console.log("error");
    }
  }, []);

  const [selectedItem, setSelection] = useState(null);
  const handSidebarItemsCick = (selected) => {
    setSelection(selected);
  };

    const handSidebarItemsClick = (selected) => {
    setSelection(selected);
    setMenuOpen(false); // Close the menu on selection
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <Homenavbar name={userdetails.username} />
      <div className={styles.fullbody}>
        <div className={`container ${styles.head}`}>
          <div className="row">
            <div className={`col-md-6 col-12 ${styles.firstside}`}>
              {!usergallarydetails.image1 ? <img src={profile} alt="" className={styles.profile} /> : <img src={usergallarydetails.image1} alt="image1" className={styles.profile} />}
            </div>
            <div className={`col-md-6 col-12 ${styles.secondside}`}>
              <div className={styles.basic}>
                <h1>{userdetails.username}</h1>
                <h4>{userbasicdetails.age} years old</h4>
                <h4>India</h4>
              </div>
              
              <div className={styles.about}>
                <h3>About me</h3>
                <p>{userdetails.about_groom}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.otherdetails}>
          <div className={styles.details}>
            <div className={styles.wrapper}>
            <button className={styles.hamburger} onClick={toggleMenu}>
                <i className="fa fa-bars"></i>
              </button>
              <CDBSidebarMenu className={`${menuOpen ? styles.topnav :styles.show}`}>
                <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={() => handSidebarItemsCick("basic")} icon="">Basic details</CDBSidebarMenuItem></NavLink>
                <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={() => handSidebarItemsCick("religion")} icon="">Religional information</CDBSidebarMenuItem></NavLink>
                <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={() => handSidebarItemsCick("location")} icon=""> Location Details</CDBSidebarMenuItem></NavLink>
                <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={() => handSidebarItemsCick("family")} icon="">Family details</CDBSidebarMenuItem></NavLink>
                <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={() => handSidebarItemsCick("preference")} icon="">Your preferences</CDBSidebarMenuItem></NavLink>
                <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={() => handSidebarItemsCick("profession")} icon="">Your professional details</CDBSidebarMenuItem></NavLink>
                <NavLink activeClassName="activeClicked" className={styles.links}><CDBSidebarMenuItem onClick={() => handSidebarItemsCick("gallary")} icon="">Your gallery</CDBSidebarMenuItem></NavLink>
              </CDBSidebarMenu>
            </div>
          </div>
          
          <div className={`container-fluid${styles.showdetails}`}>
            {selectedItem === "basic" || selectedItem === null ? <BasicDetails user={userdetails} /> : null}
            {selectedItem === "religion" && <ReligionInformation />}
            {selectedItem === "location" && <Location />}
            {selectedItem === "family" && <FamilyDetails />}
            {selectedItem === "preference" && <PartnerPreferences />}
            {selectedItem === "gallary" && <PhotoGallary />}
            {selectedItem === "profession" && <Professionaldetails />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
