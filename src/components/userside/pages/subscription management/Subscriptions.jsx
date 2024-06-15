import React, { Suspense, useEffect, useState } from 'react'
import Homenavbar from '../../layout/Homenavbar'
import styles from './subscription.module.css'
import { admin_authentcatedApiClient, authentcatedApiClient } from '../../../../api/axiosconfig'
import { backendurls } from '../../../../api/backendEndpoints'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

function Subscriptions() {

      const [subscriptionPlans,setSubscriptionPlans]  = useState(null)
      const [loading,setLoading] = useState(false)
      const[fetchloading,setfetchloading] = useState(false)
      // subscribed user plan details
      const [userSubscriptionDetails,setuserSubscriptionDetails]  = useState({})
      // individual plan details
      const [individualplan,setPlandetails] = useState({})

    //   fetching subscription details to store the data in state

const fetchSubscriptionDetails = async () =>{

     try{
        setfetchloading(true)
        const response = await authentcatedApiClient.get(backendurls.user_subscription_details)
        if (response.status === 200){
          if (response.data.message == "subscription_details"){
            setuserSubscriptionDetails(response.data.subscription_details)
            setPlandetails(response.data.plan_details)
            console.log(individualplan)
          }
          else{
            setSubscriptionPlans(response.data.subscription_details)
            console.log(response.data.message)

          }
           
        setfetchloading(false)

        }
     }
     catch(error){
        console.log(error)
     }

}
console.log(userSubscriptionDetails);
      useEffect (()=>{

        fetchSubscriptionDetails()

      },[])

    //   payment button for the subscription
    const paymentHandle =  async (planid)=>{
        setLoading(true)

        try{
            const response = await authentcatedApiClient.post(`${backendurls.createintent}/${planid}`)
            if (response.status == 200){
                const session_id = response.data.sessionId
                setLoading(false)
                redirectToCheckout(session_id)
                
            }
            
        }
        catch(error){
            console.log(error);
        }

    }
// redirecting to the payment page
const redirectToCheckout = async (sessionId) =>{
      const stripe = await window.Stripe(import.meta.env.VITE_PUBLISHABLE_KEY);
      const {error} = await stripe.redirectToCheckout({
        sessionId : sessionId,
      })
      if (error){
            console.log('error ',error);
      }

} 
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

  return (
    <div className={styles.fullbody}>
        <Homenavbar/>
        <div className={`container  ${styles.subscription_details}`}>
          
            

            <h4 className='text-center text-white pt-4'>Make your experiances good with our plans</h4>
            {
              loading ? (
                <div className="container-fluid text-center">
              
              <div className="spinner-container">
              <ClipLoader
                size={60}
               color={'#123abc'}
                 loading={loading}
               />
            </div>
            </div>):("")
                                            }

            <div className={`row ${styles.row}`}>
            
       
                                            
                {
                    !fetchloading ? (
                      subscriptionPlans !== null  ?(
                            subscriptionPlans.map((plan)=>(
                                    <div className={` col-lg-3 col-12 ms-3 ${styles.firstplan}`} key={plan.id}>
                                            <div className={styles.heading}>
                                                   
                                            <h4>{plan.plan_name}</h4>
                                            </div>
                                            <h6 className='text-warning pt-2 text-center'>Validity : {plan.vlalidity_months} months </h6>
                                            <div className={styles.plandetails}>
                                              <ul>
                                                <li className='py-2'>Allow premium users to send unlimited messages to other members</li>
                                                <li className='py-2'> Facilitating better and more meaningful conversations.</li>
                                                <li className='py-2'> Subscribed users can see more details about others.</li>
                                              </ul>
                                            </div>
                                            
                                            <button onClick={()=>paymentHandle(plan.id)} className={styles.purchase_button}>Pay ₹{plan.amount}</button>
                                            
        
                                        </div>
        
                                ))
        
                            ):
                            (

                              <div className={` col-12 ms-3 ${styles.firstplan}`}>
                                      <div className="row">
                                
                                            <div className={`col-lg-6 ${styles.userplandetails}`}>
                                              <h5 className="text-warning ">Your plan details</h5>
                                              <table className={` ${styles.tableBackgroundAlternate}`}>
                                                      <tbody>
                                                        <tr className={styles.rows}>
                                                          <td className={styles.items}><h4>Plan name </h4></td>
                                                          <td className={styles.info}><h5>{individualplan.plan_name}</h5></td>
                                                        </tr>
                                                        <tr className={styles.rows}>
                                                          <td className={styles.items}>Plan started  </td>
                                                          <td className={styles.info}> {formatDate(userSubscriptionDetails.date_started)}</td>
                                                        </tr>
                                                        <tr className={styles.rows}>
                                                          <td className={styles.items}>Expiry date </td>
                                                          <td className={styles.info}>{formatDate(userSubscriptionDetails.expiry_date)}</td>
                                                        </tr>
                                                        <tr className={styles.rows}>
                                                          <td className={styles.items}>Amount paid</td>
                                                          <td className={styles.info}>{individualplan.amount}</td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                            </div>
                                            <div className={`col-lg-6 text-center py-3 ${styles.aboutsubscription}`}>
                                            <h3 className='text-warning'>Premium Subscription! </h3>
                                        <p className={styles.para_for_subscription}>
                                              At AmorLink, we understand that finding a meaningful and lasting relationship requires the right tools and opportunities. While our free membership gives you access to basic features, upgrading to our Premium Subscription allows you to unlock the full potential of our platform, including the ability to request matches with your ideal partners. 
                                              </p>
                                              <p className={styles.para_for_subscription}>
                                              By upgrading to a Premium Subscription, you gain exclusive benefits designed to enhance your journey towards finding love:
                                              </p>
                                              
                                              <p className={styles.para_for_subscription}>
                                              Don't miss out on the chance to make meaningful connections. Upgrade to a Premium Subscription today and start requesting matches with confidence!
                                              </p>

                                                  <div className={`${styles.buttonContainer} p-3 `}>
                                                  <button  className={styles.purchase_button}>Upgrade your plan</button>
                                                  </div>
                                                  
                                            </div>
                                            
                                          </div>

                                            
        
                                        </div>
                            )
                        

                    ):(
                        <div className="spinner-container">
                            <ClipLoader
                              size={30}
                              color={'#123abc'}
                              loading={loading}
                            />
                          </div>
                        
                    )
                }

                
                
               
                
                
            </div>
            
             
            
        </div>
    </div>
  )
}

export default Subscriptions