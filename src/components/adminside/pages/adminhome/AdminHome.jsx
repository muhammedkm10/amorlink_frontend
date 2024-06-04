import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from'./AdminHome.module.css'
import { admin_authentcatedApiClient } from '../../../../api/axiosconfig'
import { NavLink, useNavigate } from 'react-router-dom'
import RegistrationNavbar from '../../../userside/layout/regnavbar'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import AdminDashboard from '../admin management components/dashboard/AdminDashboard'
import UserManagement from '../admin management components/user management/UserManagement'
import SubscriptionManagement from '../admin management components/subscription management/SubscriptionManagement'

function AdminHome() {
    const state = useSelector(state=>state.auth.admintoken)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sidebarElement,setSidebarElement] = useState(null)
    

      const  logout =  () =>{

              const loginrl = "/admin/adminlogin";
              dispatch({type:"LOGIN FAILURE"})
              localStorage.removeItem("authAdminTokens");
              localStorage.removeItem("role");
              navigate("/admin/adminlogin")
}


    useEffect(()=>{
      try{
             admin_authentcatedApiClient.get('/authapp/usersignup')
             .then((response)=>{
              if (response.data.message === "unauthorized"){
                console.log(response.data.message)
                navigate("/unauthorized")
              }
              if (response.data.message === "Success"){
                console.log("i got the user")
              }
            })

            }
        catch(error){
              console.log("erroorrrrr")
        }
    },[])

    // sidebar management 

    const SidebarManagement = (value) =>{
          setSidebarElement(value)
    }




  return (
    <>  
    <RegistrationNavbar user="admin"/>
  

   <div className={styles.body}>
    {/* sid bar */}
      <div className={styles.wrapper}>
            <CDBSidebar className={styles.sidebar1}>
              <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <a
                  href="/admin/adminhome"
                  className="text-decoration-none"
                  style={{ color: 'inherit' }}
                >
                  Admin Dashboard
                </a>
              </CDBSidebarHeader>

              <CDBSidebarContent className={styles.sidebar_content}>
                <CDBSidebarMenu>
                  <NavLink   onClick={()=>SidebarManagement("dashboard")} className={styles.links} activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="columns" onClick={()=>SidebarManagement("dashboard")}>Dashboard</CDBSidebarMenuItem>
                  </NavLink>
                  
                  <NavLink   className={styles.links} onClick={()=>SidebarManagement("users")}  activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="user" onClick={()=>SidebarManagement("users")}  >Users</CDBSidebarMenuItem>
                  </NavLink>
                  
                  <NavLink exact    className={styles.links} onClick={()=>SidebarManagement("subscription")}  activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="envelope"  ocnClick={()=>SidebarManagement("subscription")} >Subscription</CDBSidebarMenuItem>
                  </NavLink>
                  
                 
                  <NavLink exact onClick={logout} className={styles.links} activeClassName="activeClicked">
                    <CDBSidebarMenuItem  icon="sign-out-alt">
                      logout
                    </CDBSidebarMenuItem>
                  </NavLink>



                </CDBSidebarMenu>
              </CDBSidebarContent>

              <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div
                  style={{
                    padding: '20px 5px',
                  }}
                >
                  Amorlink
                </div>
              </CDBSidebarFooter>
            </CDBSidebar>
          </div>

          {/* sid bar end */}

          <div className={styles.maincontent}>
              {sidebarElement === "dashboard" || sidebarElement === null ? <AdminDashboard/>  : ""}
              {sidebarElement === "users" && <UserManagement/>}
              {sidebarElement === "subscription" && <SubscriptionManagement/>}

          </div>

          </div>
    </>
    
  )
}


export default AdminHome