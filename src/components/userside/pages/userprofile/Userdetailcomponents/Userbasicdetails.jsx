import React, { useEffect, useState } from 'react'
import styles from './common.module.css'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'

function BasicDetails() {
  const [basicdetails,setBasicdetails] = useState({})
  console.log(basicdetails)

  useEffect(()=>{
  
      const fetchBasicDetails = async () => {
        try {
          const response = await authentcatedApiClient.get(backendurls.userprofile, {
            headers: {
              'details': 'basic_details', // Replace with your actual header and value
            },
          });
          
          if (response.data.message === 'success') {
            console.log(response.data)
            console.log(response.data)
            setBasicdetails(response.data.basic_details);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchBasicDetails();
  },[])


  const FetchBasicDetails = async ()=>{
   
  
          
  }
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>Basic detais</h4>
        <div className={styles.basic_details}>
              <h4 className={styles.items}>Marital status : {!basicdetails.marital_status ? "null" : basicdetails.marital_status}</h4>
              <h4 className={styles.items}>Date of Birth : {!basicdetails.dob  ? "None" : basicdetails.dob}</h4> 
              <h4 className={styles.items}>Height : {!basicdetails.height ? "None" : basicdetails.height}</h4>
              <h4 className={styles.items}>Weight : {!basicdetails.weight ? "None" : basicdetails.weight}</h4>
              <h4 className={styles.items}>Body type : {!basicdetails.body_type ? "None" :basicdetails.body_type }</h4>
              <h4 className={styles.items}>Physical status : {!basicdetails.physical_status ? "None" :basicdetails.physical_status}</h4>
              <h4 className={styles.items}>Drinking Habits : {!basicdetails.drinking_habits ? "None" :basicdetails.drinking_habits}</h4>
              <h4 className={styles.items}>Eating Habits : {!basicdetails.eating_habits ? "None" :basicdetails.eating_habits}</h4>
              <h4 className={styles.items}>Smoking Habits : {!basicdetails.smalking_habits ? "None" :basicdetails.smalking_habits }</h4>
              <h4 className={styles.items}>Hobbies : {!basicdetails.hobbies ? "None" :basicdetails.hobbies}</h4>
        </div>
      
    </div>
  )
}

export default BasicDetails