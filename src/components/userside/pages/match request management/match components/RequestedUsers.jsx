import React, { useEffect, useState } from 'react'
import styles from './matchcomponents.module.css'
import image from '../../../../../assets/images/pppp.jpg'
import '../../../../../assets/css/sweetalert-custom.css'
import { Link } from 'react-router-dom'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'

function RequestedUsers() {
  const [requestedusers, setRequestedUsers] = useState([])
  const [requestaccepted, setRequestaccepted] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const current_user = localStorage.getItem('user_id')

  // fetching requested users details for this user
  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await authentcatedApiClient.get(
        backendurls.matchrequests,
        {
          headers: {
            details: 'requested_users',
          },
        },
      )

      if (response.data.message === 'success') {
        setLoading(false)
        setRequestedUsers(response.data.users)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [requestaccepted])

  // accepting the requests
  const AcceptRequest = async (userid) => {
    const result = await Swal.fire({
      title: 'do you want to accept the request?',
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
        `,
      },
    })
    if (result.isConfirmed) {
      try {
        const response = await authentcatedApiClient.patch(
          `${backendurls.matchrequests}/${userid}`,
        )
        if (response.data.message === 'success') {
          SendAcceptedNotification(userid)
          Swal.fire({
            title: 'Request accepted successfully',
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
            `,
            },
          })
          setRequestaccepted(!requestaccepted)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  // removing from requests

  const RemoveFromRequests = async (userid) => {
    const result = await Swal.fire({
      title: 'do you wanto reject?',
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
        `,
      },
    })
    if (result.isConfirmed) {
      try {
        const response = await authentcatedApiClient.delete(
          `${backendurls.matchrequests}/${userid}`,
        )
        if (response.data.message === 'success') {
          Swal.fire({
            title: 'Request removed  successfully',
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
              `,
            },
          })
          setRequestaccepted(!requestaccepted)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  // sending notification to the user

  const SendAcceptedNotification = async (recieverid) => {
    try {
      const response = authentcatedApiClient.post(
        `${backendurls.notification}/${current_user}/${recieverid}`,
        {
          headers: {
            details: '!request!accepted!',
          },
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`container ${styles.fullbody}`}>
      <div className="row col-3 col-12">
        <div className={`col-lg-3 col-12 ${styles.firstside}`}>
          <div className={styles.editprofile}>
            <h5 className={styles.head}>Change your preferences</h5>
            <p className={styles.para}>
              By specifying your preferences clearly, the matchmaking algorithm
              can more effectively identify potential partners who share similar
              values, interests, and life goals.{' '}
            </p>
            <Link to="/profile">
              <button className={styles.profilelinking}>
                go to your profile
              </button>
            </Link>
          </div>
        </div>

        <div className={`col-lg-9 col-12 ${styles.secondside}`}>
          {!isLoading ? (
            requestedusers && requestedusers.length === 0 ? (
              <p className="text-center text-white">
                Oops.....! No requests for you{' '}
                <Link to="/preferences">go to your preferences</Link>
              </p>
            ) : (
              requestedusers.map((user) => (
                <div className={`container ${styles.wrapper}`}>
                  <div className="row justify-content-evenly text-center">
                    <div
                      className={`col-lg-6 col-12 d-flex  align-items-center  ${styles.image}`}
                    >
                      {user.image_details ? (
                        <Link
                          className="text-white "
                          to={`/shoeprofiles`}
                          title="click here"
                          state={{
                            comingfrom: 'others_requests',
                            userid: user.id,
                          }}
                        >
                          <img
                            src={`${import.meta.env.VITE_IMAGE}${user.image_details}`}
                            width="50px"
                            className="d-block"
                            height="50px"
                            alt=""
                          />
                        </Link>
                      ) : (
                        <Link
                          className="text-white "
                          to={`/shoeprofiles`}
                          title="click here"
                          state={{
                            comingfrom: 'others_requests',
                            userid: user.id,
                          }}
                        >
                          {' '}
                          <img src={image} width="50px" height="50px" alt="" />
                        </Link>
                      )}
                      <h6 className="ms-5 text-white">{user.name} </h6>
                    </div>
                    <div className={`col-lg-6 col-12 ${styles.details}`}>
                      <div className="d-flex justify-content-center align-items-center col-12 mt-lg-0 mt-3 ">
                        <Link>
                          <button
                            onClick={() => AcceptRequest(user.id)}
                            className={styles.button1}
                          >
                            accept
                          </button>
                        </Link>
                        <Link>
                          <button
                            onClick={() => RemoveFromRequests(user.id)}
                            className={styles.button2}
                          >
                            Reject
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="spinner-container d-flex justify-content-center p-5">
              <ClipLoader size={30} color="#123abc" loading={isLoading} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestedUsers
