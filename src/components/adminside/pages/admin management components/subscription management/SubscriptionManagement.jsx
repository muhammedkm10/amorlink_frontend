import React, { useEffect, useState } from 'react'
import styles from './subscriptionmanagement.module.css'
import { admin_authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import Swal from 'sweetalert2';

function SubscriptionManagement() {


   const [subscriptionDetails,setSubscriptionDetails] = useState([])
   const [addSubscription,setSubscription] = useState({})
   const [AddPage,setAddpage] = useState(false)




  //  fetching the data from the backed and setting to the state
  const Fetchdata = async () =>{

    const response = await admin_authentcatedApiClient.get(backendurls.subscription)
      setSubscriptionDetails(response.data)
  }

  useEffect (()=>{
        Fetchdata()
  },[AddPage])
  

// handling the  change in the forms data to change the state

const handleChange = (e) =>{
    const {name,value} = e.target
    setSubscription({
        ...addSubscription,
        [name]:value
    })
    
} 

//  adding the plan to the backend and save in the data base
  const AddingPlan = async ()=>{
    try{
      const response = await admin_authentcatedApiClient.post(backendurls.subscription,addSubscription)


      if (response.status === 201 ){
        Swal.fire({
          title: 'Added  successfully',
          text: 'plan  added succesfully',
          icon: 'success',
      });
      }
      setAddpage(false)

    }
    catch(error)
    {
      console.log(error);
    }
      
  }


  return (
    <div>
        {!AddPage ? (
        <div  className={`container ${styles.body}`}>
        <h3>Your plan details</h3>

            <div className="row mt-4">
                    <div className="col-12">
                        <div className="table-table_responsive">
                            <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>plan name</th>
                                    <th>No of users</th>
                                    <th>validity</th>
                                    <th>Amount</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {subscriptionDetails.map((element)=>

                              <tr>
                              <td><p>{element?.plan_name}</p></td>
                              <td><p>{element.no_users ? element.no_users :"0"}</p></td> 
                              <td><p>{element?.vlalidity_months}</p></td>
                              <td><p>{element?.amount}</p></td>
                              <td>
                                      {!element.is_listed ? <button className='px-1 px-lg-5 m-2 bg-success border-0 text-white'>list</button>:
                                      <button className='px-1 px-lg-5  bg-danger border-0 text-white'>unlist</button>}

                                      <button className='px-1 px-lg-5 m-2 bg-info border-0 text-white'>edit</button>

                              </td>
                          </tr>
                              
                            )}
                                
                            </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            <button className={styles.add} onClick={()=>setAddpage(true)}><i className='fa fa-plus px-lg-2 px-1'></i>add plans</button>
        </div>
        ):
        (

            <div className={`text-center ${styles.addform}`}>
              <h2>Add Plan</h2>
                <div className="form-group">
                  <input type="text" className={`form-control my-4 ${styles.formelement}`} name='plan_name'  id="planName" placeholder="Enter plan name"  onChange={handleChange} required/>
                </div>
                
                <div className="form-group">
                  <input type="number" className={`form-control ${styles.formelement}`} id="validity" name='vlalidity_months' placeholder="Enter validity period" onChange={handleChange}  required/>
                </div>
                <div className="form-group">
                  <input type="number" className={`form-control my-4 ${styles.formelement}`} id="amount" name='amount' placeholder="Enter amount" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary mt-5 m-2" onClick={AddingPlan}>Submit</button>
                <button type="button" className="btn btn-secondary mt-5   m-2 ml-2" onClick={() => setAddpage(false)}>Cancel</button>
            </div>
         
        )}
        
    </div>

  )
}

export default SubscriptionManagement