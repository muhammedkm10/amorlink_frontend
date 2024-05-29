import React ,{useEffect}from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'


function ReligionInformation() {

    useEffect(()=>{
  
        const fetchReligionalInformation= async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'religional_information', // Replace with your actual header and value
              },
            });
            
            if (response.data.message === 'success') {
              console.log(response.data)
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchReligionalInformation();
    },[])
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>ReligionInformation</h4>
      
    </div>
  )
}

export default ReligionInformation