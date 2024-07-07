import React, { useEffect, useState } from 'react'
import styles from './common1.module.css'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import {Link} from 'react-router-dom'
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../../assets/css/custom-toastify.css'
import '../../../../../assets/css/sweetalert-custom.css'



function BasicDetailsLookup({userid,subscribed}) {
  const [basicdetails,setBasicdetails] = useState({})
  const [userdetais,setUserdetails] = useState({})
  const [lookupuserid,setLookupuserid] = useState(userid)
  console.log("lookup user id in the frond end",lookupuserid);


  useEffect(()=>{
  
      const fetchBasicDetails = async () => {
        try {
          const response = await authentcatedApiClient.get(backendurls.userprofile, {
            headers: {
              'lookupuserid':lookupuserid,
              'details': 'basic_details', 
              'type':'lookup'

            },
          });
          
          if (response.data.message === 'success') {
            setBasicdetails(response.data.basic_details);
            setUserdetails(response.data.userdetails)
            
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchBasicDetails();
  },[])

  console.log("basice_details",subscribed);
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>Basic detais</h4>
        <div className={`container ${styles.basic_details}`}>
            <div className="row">
              <div className="col-lg-4 col-12">
                <table className={`${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Email:</td>
                     
                      <td className={subscribed ? `${styles.info}`: `${styles.blurringinfo}`}>{!userdetais.email ? "Not specified" : userdetais.email}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Phone:</td>
                      <td className={subscribed ? `${styles.info}`: `${styles.blurringinfo}`}>{!userdetais.phone ? "Not specified" : userdetais.phone}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Marital status:</td>
                      <td className={styles.info}>{!basicdetails.marital_status ? "Not specified" : basicdetails.marital_status}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Date of Birth:</td>
                      <td className={subscribed ? `${styles.info}`: `${styles.blurringinfo}`}>{!basicdetails.dob ? "Not specified" : basicdetails.dob}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Hobbies:</td>
                      <td className={subscribed ? `${styles.info}`: `${styles.blurringinfo}`}>{!basicdetails.hobbies ? "Not specified" : basicdetails.hobbies}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 col-12">
                <table className={`${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Height:</td>
                      <td className={styles.info}>{!basicdetails.height ? "Not specified" : basicdetails.height}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Weight:</td>
                      <td className={styles.info}>{!basicdetails.weight ? "Not specified" : basicdetails.weight}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Body type:</td>
                      <td className={styles.info}>{!basicdetails.body_type ? "Not specified" : basicdetails.body_type}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Physical status:</td>
                      <td className={styles.info}>{!basicdetails.physical_status ? "Not specified" : basicdetails.physical_status}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Mother tongue:</td>
                      <td className={styles.info}>{!basicdetails.mother_toungue ? "Not specified" : basicdetails.mother_toungue}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 col-12">
                <table className={` ${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Drinking Habits:</td>
                      <td className={styles.info}>{!basicdetails.drinking_habits ? "Not specified" : basicdetails.drinking_habits}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Eating Habits:</td>
                      <td className={styles.info}>{!basicdetails.eating_habits ? "Not specified" : basicdetails.eating_habits}</td>
                    </tr>
                    <tr  className={styles.rows}>
                      <td className={styles.items}>Smoking Habits:</td>
                      <td className={styles.info}>{!basicdetails.smalking_habits ? "Not specified" : basicdetails.smalking_habits}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div>
  )
}

export default BasicDetailsLookup