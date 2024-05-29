import React ,{useEffect}from 'react'
import styles from './common.module.css'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'

function FamilyDetails() {

    useEffect(()=>{
  
        const fetchFamilyDetails = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'family_details', // Replace with your actual header and value
              },
            });
            
            if (response.data.message === 'success') {
                console.log(response.data)

            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchFamilyDetails();
    },[])
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>Family Details</h4>
      
      
    </div>
  )
}

export default FamilyDetails


