import React, { useState } from 'react'
import styles from  './matches.module.css'
import Homenavbar from '../../layout/Homenavbar'
import { CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact'
import { NavLink } from 'react-router-dom'
import AcceptedMatches from './match components/AcceptedMatches'
import RequestedUsers from './match components/RequestedUsers'
import RequestedByCurrentUser from './match components/RequestedByCurrentUser'

function Matches() {
    const [selectedItem,setSelectedItem] = useState("matches")
    const [menuOpen, setMenuOpen] = useState(false) 



    // setting the selected item to fetch the data as selection of the user

    const handSidebarItemsCick = (selected) =>{
        setSelectedItem(selected)
    }


       // toggle bar controlling
       const toggleMenu = () => {
        setMenuOpen(!menuOpen)
      }
    



  return (
    <div className={styles.fullend}>
        <Homenavbar/>
        <div className={styles.body}>

           <div className={styles.head}>



{/* second navbar part */}
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
                  className={selectedItem === "matches" ? styles.selected : styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('matches')}
                    icon=""
                  >
                Your matches
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={selectedItem === "requests" ? styles.selected : styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('requests')}
                    icon=""
                  >
                    Requested for match
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={selectedItem === "current_user_requests" ? styles.selected : styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('current_user_requests')}
                    icon=""
                  >
                Your requests
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </div>
          </div>
          </div>
    </div>
        


        {/* details showing part */}


          <div  className={`container-fluid p-0 ${styles.showdetails}`}>
            {selectedItem === 'matches' || selectedItem === null ? (
              <AcceptedMatches/>
            ) : null}
            {selectedItem === 'requests' && <RequestedUsers/>}
            {selectedItem === 'current_user_requests' && <RequestedByCurrentUser/>}
          </div>

        </div>
    </div>
  )
}


export default Matches