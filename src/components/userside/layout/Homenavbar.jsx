import React, { useEffect, useState } from 'react'
import logo from './../../../assets/images/logo-removebg-preview.png'
import styles from './Homenavbar.module.css' // Import your CSS module
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { authentcatedApiClient } from '../../../api/axiosconfig'
import { backendurls } from '../../../api/backendEndpoints'
import SubscriptionNeededModal from '../pages/preference/preference components/SubscriptionNeededModal'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import '../../../assets/css/sweetalert-custom.css'

function Homenavbar({ page}) {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const dispatch = useDispatch()
  const [pagefrom,setpagefrom] = useState(page)
  const [notificationbar,setNotificationbar] = useState(false)
  const [notifications,setNotification] = useState([])
  const [notification_count,setNotificationCount] = useState(null)


  const handleHamburgerClick = () => {
          setIsNavVisible(!isNavVisible)
  }

  const [user, setUser] = useState({})

//  modal showing
  const [isvisibleModal, setIsvisibleModal] = useState(false)


  // fetching the current user data
  useEffect(() => {
    try {
      authentcatedApiClient.get(backendurls.signup).then((response) => {
    
        if (response.data.message === 'unauthorized') {
                  console.log('unauthorized');
         
         
        }
        if (response.data.message === 'Success') {
          console.log(response.data.usergallary);
          setNotificationCount(response.data.notification_count)
          console.log('notification count',notification_count);
          setUser(response.data.user)
          
          
         
        }
      })
    } catch (error) {
      console.log('erroorrrrr')
    }
  }, [notifications])

console.log(user);


  //  logout functionality
  const logout = async () => {
          const result = await Swal.fire({
            title: 'Do you want to logout?',
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
          })
          if (result.isConfirmed){
              dispatch({ type: 'LOGIN FAILURE' })
              localStorage.removeItem('authUserTokens')
              localStorage.removeItem('user_id');
              <Navigate to="/" replace />
          }
  }


  // notifications for the current login user
  const Fetch_Notifications = async () =>{
    try{
      const response = await authentcatedApiClient.get(backendurls.notification)

      if (response.data.message === "succes"){
        console.log('i ama working');
        setNotification(response.data.notifications)
        setNotificationbar(!notificationbar)


      }


    }
    catch(error){
      console.log(error);
    }

  }

  console.log("my notifications",notifications);
  

  // clear message function
  const clearMessages = async () =>{
      console.log('i am working inside');
          try{
            const response = await authentcatedApiClient.delete(backendurls.notification)
            if (response.data.message === 'success'){
              setNotificationbar(!notificationbar)


            }
          }
          catch(error){
            console.log(error);
          }
  }

  return (
    <div>
     
      {
        isvisibleModal && 
               ( <SubscriptionNeededModal modalvisiblefunction={setIsvisibleModal}/>)
      }

      <nav className={!page ? `container-fluid ${styles.nav1}` : `container-fluid ${styles.nav2}`}>
        <img src={logo} className={styles.navbarLogo} alt="Logo" />
        <div className={styles.hamburger1} onClick={handleHamburgerClick}>
          <div className={styles.hamburger}>
            <i className={`fas fa-bars ${styles.hamburgerIcon}`}></i>
          </div>
        </div>

        <div
          className={`${styles.nav__link} ${isNavVisible ? '' : styles.hide} `}
        >
          <Link to="/home" title="Home">
            {' '}
            <i
              className={`fas fa-home  icon${styles.hamburgerIcon}`}
              title="Home"
              style={{ color: 'white' }}
            ></i>
          </Link>
          {
            !user.subscribed ? (
              <Link onClick={()=>setIsvisibleModal(true)} > <i className='fas fa-lock text-warning'></i><span className='text-warning'> Matches</span></Link>
            ):(
              <Link to="/matches">Matches</Link>
            )
          }
          
          <Link to="/preferences">Preferences</Link>
          {
            !user.subscribed ? (
              <Link onClick={()=>setIsvisibleModal(true)} > <i className='fas fa-lock text-warning'></i><span className='text-warning'> Chat</span></Link>
            ):(
              <Link to={`/chat/${user.id}/${0}`}>Chat</Link>
            )
          }
         
          {
            !user.subscribed ? (
              <Link to="/subscriptions">PRO*</Link>

            ) : (
              <Link to="/subscriptions">Plan details</Link>
            )

          }
         
          
          <Link
            to="/profile"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={user.username}
          >
            {' '}
            <i className="fas fa-user" style={{ color: 'white' }}></i>{' '}
          </Link>
          <Tooltip id="my-tooltip" type="dark" effect="solid" />
          <Link onClick={Fetch_Notifications} title="logout" className={styles.notification}>
          <div className={styles.content}>
            <i
              className="fas fa-bell "
              style={{ marginRight: '3px',color:'gold'  }}
            ></i> 
            {
              notification_count !== 0 &&
              <div className={styles.notificationBadge}>{notification_count}</div>

            }
              </div>
          </Link>
          <Link onClick={logout} title="logout">
            <i
              className="fas fa-sign-out-alt"
              style={{ marginRight: '8px' }}
            ></i>
          </Link>
          
        </div>
      </nav>
                  {notificationbar &&
                  <div>
                         {notifications.length !== 0 ?
                         (<div className={styles.notification_section}>
                           <div >
                            {notifications.map((elements)=>(
                              <div>
                                {
                                  elements.match_send_request ? (
                                    <div className={styles.notification_bar}>
                                
                                    <p className={styles.notification_text}>You have a match request from <span className={styles.sender_name}>{elements.sender.username}</span>  </p>
                                </div>
                                  ) : (
                                    <div className={styles.notification_bar}>
                                
                                    <p className={styles.notification_text}><span className={styles.sender_name}>{elements.sender.username}</span> accepted you'r  request</p>
                                </div>
                                  )
                                }
                              </div>
                             
                             ))
                           }
                            </div>
                            <div className={styles.lower}>
                              <Link to="/matches" className={styles.nav_button}>Go to matches</Link>
                              <button onClick={clearMessages}className={styles.clear_button}>clear all</button>
                            </div>
                    
                         </div>):(<div className={styles.notification_section_without_message}><p  className={styles.no_notification}>No notifications</p></div>)
                         }
                         


                  </div>
                }
                  
                  
                     
               
      
    </div>
  )
}

export default Homenavbar
