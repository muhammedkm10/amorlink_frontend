import React, { useEffect, useState } from 'react'
import styles from './subscriptionmanagement.module.css'
import { admin_authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import Swal from 'sweetalert2';

function SubscriptionManagement() {
  
  //  show subscriptio state
   const [subscriptionDetails,setSubscriptionDetails] = useState([])
  //  adding subscription state
   const [addSubscription,setSubscription] = useState({})
   const [AddPage,setAddpage] = useState(false)
// edit subscription states
   const [editSubscription,setEditsubscription] = useState({})
   const [EditPage,setEditPage] = useState(false)
   const [EditingSubscriptionId,setEditingSubscriptionId] = useState(null)





  //  fetching the data from the backed and setting to the state
  const Fetchdata = async () =>{

    const response = await admin_authentcatedApiClient.get(backendurls.subscription)
      setSubscriptionDetails(response.data)
  }

  useEffect (()=>{
        Fetchdata()
  },[AddPage,EditPage])
  

// handling the  change in the forms data to change the state

const handleChange = (e) =>{
    const {name,value} = e.target

    // setting data to the state for edit subscription
    if (EditPage){
      setEditsubscription({
        ...editSubscription,
        [name]:value
      })
      if (name === "is_listed"){
        console.log('value',value);
        setEditsubscription({
          ...editSubscription,
          [name]:!editSubscription.is_listed
        })
      }
    }
    // setting data to the state for add subscription

    else{
      setSubscription({
        ...addSubscription,
        [name]:value
    })

    }
   
    
} 

//  adding the plan to the backend and save in the data base
  const AddingPlan = async ()=>{
    if (!addSubscription.plan_name || !addSubscription.vlalidity_months || !addSubscription.amount){
      Swal.fire({
        title: 'fill the form currectly',
        icon: 'error',
    });
    }
    else {
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
        setSubscription({})
  
      }
      catch(error)
      {
        console.log(error);
      }

    }
    
      
  }


  // edit plan  

  const EditPlan = (subcription) =>{
    setEditsubscription(subcription)
    setEditingSubscriptionId(subcription.id)
    setEditPage(true)

  }

  const EditsubmitHandler = async () =>{
    if (!editSubscription.plan_name || !editSubscription.vlalidity_months || !editSubscription.amount)
      Swal.fire({
        title: 'fill the form currectly',
        icon: 'error',
    });
    else{
      try{
     
        const response = await admin_authentcatedApiClient.patch(`${backendurls.subscription}/${EditingSubscriptionId}/`, editSubscription)
         if (response.data.message === 'success'){
           Swal.fire({
             title: 'Edited  successfully',
             text: 'plan  Edited succesfully',
             icon: 'success',
         });
         setEditPage(false)
         }
     }
     catch(error){
        console.log(error);
     }

    }
  }



  return (
    <div>
        {!AddPage && !EditPage? (

          // showing subscription plans
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
                                    <th>Listed</th>
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
                                    <td>{element.is_listed ? <p>listed</p>:<p>not listed</p>}</td>
                                    <td>
                                            <button onClick={()=>EditPlan(element)} className='px-1 px-lg-5 m-2 bg-info border-0 text-white'>edit</button>
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
        
        

        //  adding the subscription plans 
        
        AddPage ?  (

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
         
        ):

        // showing the edit page
        
        (
                  <div className={`text-center ${styles.addform}`}>
                  <h2>Edit Plan</h2>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control my-4 ${styles.formelement}`}
                      name='plan_name'
                      placeholder="Enter plan name"
                      value={editSubscription.plan_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className={`form-control ${styles.formelement}`}
                      name='vlalidity_months'
                      placeholder="Enter validity period"
                      value={editSubscription.vlalidity_months}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className={`form-control my-4 ${styles.formelement}`}
                      name='amount'
                      placeholder="Enter amount"
                      value={editSubscription.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group ">
                  <input
                    type="checkbox"
                    id="listCheckbox"
                    checked={editSubscription.is_listed}
                    onChange={handleChange}
                    name='is_listed'

                  />
                  <label htmlFor="listCheckbox" title='click to chang the list property'>
                    {editSubscription.is_listed ? "Listed" : "Unlisted"}
                  </label>
                  </div>

                  <button type="submit" className="btn btn-primary mt-5 m-2" onClick={EditsubmitHandler}>Update</button>
                  <button type="button" className="btn btn-secondary mt-5 m-2 ml-2" onClick={() => setEditPage(false)}>Cancel</button>
                </div>
        )

        
        }
        
    </div>

  )
}

export default SubscriptionManagement