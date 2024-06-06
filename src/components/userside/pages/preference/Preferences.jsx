import React, { useState } from 'react'
import Homenavbar from '../../layout/Homenavbar'
import styles from './preference.module.css'
import { CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact'
import { NavLink } from 'react-router-dom'
import Personal from './preference components/Personal'
import Lifestyle from './preference components/Lifstyle'
import Religion from './preference components/Religion'
import Profession from './preference components/Profession'



function Preferences() {

    const [menuOpen, setMenuOpen] = useState(false) 

    // handlinkg clicked item
    const [selectedItem, setselectedItem] = useState("personal") 

    const handSidebarItemsCick =(details) =>{
          setselectedItem(details)
          console.log(selectedItem);
    }

    // function to  handle the toggle menu

    const toggleMenu = () =>{
        setMenuOpen(!menuOpen)
    }
  return (
    <div className={styles.body}>
        <Homenavbar/>
        <div id="other details"className={styles.otherdetails}>
        <h4 className='text-white'>Find your partner based on your preferences</h4>

          <div className={styles.details}>
            <div className={styles.wrapper}>
              <button className={styles.hamburger} onClick={toggleMenu}>
                <i className="fa fa-bars"></i>
              </button>
              <CDBSidebarMenu
                className={`${menuOpen ? styles.topnav : styles.show}`}
              >
                <NavLink
                  className={selectedItem === "personal" ? styles.selected : styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('personal')}
                    icon=""
                  >
                    Personal informations
                  </CDBSidebarMenuItem>
                </NavLink>
                
                <NavLink
                  className={selectedItem === "lifestyle" ? styles.selected : styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('lifestyle')}
                    icon=""
                  >
                    Lifestyle  informations
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  className={selectedItem === "religional" ? styles.selected : styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('religional')}
                    icon=""
                  >
                    Reigion and cast
                  </CDBSidebarMenuItem>
                </NavLink>
                
                
                <NavLink
                  className={selectedItem === "profession" ? styles.selected : styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('profession')}
                    icon=""
                  >
                   Educational & Professional Information
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </div>
          </div>
          <div  className={`container  p-1 ${styles.showdetails}`}>
            {selectedItem === 'personal' || selectedItem === null ? (<Personal/> ) : null}
            {selectedItem === 'lifestyle' && <Lifestyle />}
            {selectedItem === 'religional' && <Religion />}
            {selectedItem === 'profession' && <Profession/>}
        </div>
        </div>
    </div>
  )
}

export default Preferences