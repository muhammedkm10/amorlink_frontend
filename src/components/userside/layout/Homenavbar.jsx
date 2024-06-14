import React, { useEffect, useState } from 'react'
import logo from './../../../assets/images/logo-removebg-preview.png'
import styles from './Homenavbar.module.css' // Import your CSS module
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { authentcatedApiClient } from '../../../api/axiosconfig'
import { backendurls } from '../../../api/backendEndpoints'
import SubscriptionNeededModal from '../pages/preference/preference components/SubscriptionNeededModal'

function Homenavbar({ page}) {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const dispatch = useDispatch()


  const handleHamburgerClick = () => {
          setIsNavVisible(!isNavVisible)
  }

  const [user, setUser] = useState({})

//  modal showing
  const [isvisibleModal, setIsvisibleModal] = useState(false)


  useEffect(() => {
    try {
      authentcatedApiClient.get(backendurls.signup).then((response) => {
        if (response.data.message === 'unauthorized') {
          console.log(response.data.message)
         
        }
        if (response.data.message === 'Success') {
          setUser(response.data.user)
          
          
         
        }
      })
    } catch (error) {
      console.log('erroorrrrr')
    }
  }, [])


   
  const logout = () => {
    dispatch({ type: 'LOGIN FAILURE' })
    localStorage.removeItem('authUserTokens')
    localStorage.removeItem('role');
    <Navigate to="/" replace />
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
          <Link to="#">Chat</Link>
          {
            !user.subscribed ? (
              <Link to="/subscriptions">PRO*</Link>

            ) : (
              <Link to="/subscriptions">Plan details</Link>
            )

          }
         
          <Link to="#">Search</Link>
          <Link
            to="/profile"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={user.username}
          >
            {' '}
            <i className="fas fa-user" style={{ color: 'white' }}></i>{' '}
          </Link>
          <Tooltip id="my-tooltip" type="dark" effect="solid" />
          <Link onClick={logout} title="logout">
            <i
              className="fas fa-sign-out-alt"
              style={{ marginRight: '8px' }}
            ></i>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Homenavbar
