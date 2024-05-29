import React ,{useEffect}from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'

function Location() {

    useEffect(()=>{
  
        const fetchLocaitionDetails = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'location_details', // Replace with your actual header and value
              },
            });
            
            if (response.data.message === 'success') {
              console.log(response.data)
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchLocaitionDetails();
    },[])
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>location detais</h4>
      
    </div>
  )
}

export default Location