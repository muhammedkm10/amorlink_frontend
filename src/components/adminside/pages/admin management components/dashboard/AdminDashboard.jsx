import React, { useEffect, useState } from 'react'
import styles from './admindashboard.module.css'
import { admin_authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
function AdminDashboard() {

  const [details,setDetails] = useState([])
  const [other_details,setOtherDetails] = useState([])

  const fetchData = async () =>{
    try{
      const response = await admin_authentcatedApiClient.get(backendurls.dashboard)
      if(response.data.message === "success"){
         setDetails(response.data.data)
         setOtherDetails(response.data.dashboard_details)
      }
      
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect (()=>{
    fetchData()

  },[])
  console.log(other_details);
  return (
    <div className={`container ${styles.maincontainer}`}>
             
          <div className={`${styles.head}`}>
               <h4>Admin dashboard</h4>
          </div>
          <div className={`${styles.subcontainer}`}>
              <div className={`container ${styles.userslist}`}>
                <h3 className='p-3'>Users</h3>
                <div className="row d-flex justify-content-around">
                    <div className={`col-md-3 col-12 ${styles.lists}`}><h6 className={styles.details_name}>Total users  </h6> <span className={styles.value}>{other_details.total_users}</span></div>
                    <div className={`col-md-3 col-12 ${styles.lists}`}><h6 className={styles.details_name}>Subscribed users  </h6><span className={styles.value}>{other_details.subcribed}</span></div>
                    <div className={`col-md-3 col-12 ${styles.lists}`}><h6 className={styles.details_name}>Non-subscribed users  </h6><span className={styles.value}>{other_details.non_subscribed}</span></div>
                </div>
              </div>
              
              <div className={`container ${styles.paymentdetails}`}>
                <h3 className='p-3'>Subscription payment details</h3>
              <div className="row d-flex justify-content-around">
                    <div className={`col-md-3 col-12 ${styles.lists}`}><h6 className={styles.details_name}> Total amount paid </h6> <span className={styles.value}>{other_details.total_amount}</span></div>
                    <div className={`col-md-3 col-12 ${styles.lists}`}><h6 className={styles.details_name}>From 6 month plan</h6> <span className={styles.value}>{other_details.six_month}</span></div>
                    <div className={`col-md-3 col-12 ${styles.lists}`}><h6 className={styles.details_name}>From 1 year plan </h6><span className={styles.value}>{other_details.one_year}</span> </div>
                
                </div>
              </div>

          </div>
          <div  className={`container ${styles.body}`}>
        <h3>Your payment details</h3>

            <div className="row mt-4">
                    <div className="col-12">
                        <div className="table-table_responsive">
                            <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>User name</th>
                                    <th>Plan name</th>
                                    <th>Amount</th>
                                    <th>Phone</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                             {
                              details.map((element)=>(
                                <tr>
                                    <td>{element.user_id.username}</td>
                                    <td>{element.plan.plan_name}</td> 
                                    <td>{element.plan.amount}</td>
                                    <td>{element.user_id.phone}</td>
                                    <td>{element.date_started}</td>
                                  </tr>

                              ))
                             }
                                    
                                  
                            </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>

         
    </div>
  )
}

export default AdminDashboard