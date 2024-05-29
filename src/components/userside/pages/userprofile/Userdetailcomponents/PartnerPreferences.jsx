import React,{useEffect} from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'

function PartnerPreferences() {
    useEffect(()=>{
  
        const fetchPartnerPreference = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'partner_preferences', // Replace with your actual header and value
              },
            });
            
            if (response.data.message === 'success') {
              console.log(response.data)
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchPartnerPreference();
    },[])
    
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>PartnerPreferences</h4>
      
    </div>
  )
}

export default PartnerPreferences