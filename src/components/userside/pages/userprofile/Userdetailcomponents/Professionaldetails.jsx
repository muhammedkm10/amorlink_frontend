import React ,{useEffect}from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'

function Professionaldetails() {

  useEffect(()=>{
  
    const fetchProfessiionaldetails= async () => {
      try {
        const response = await authentcatedApiClient.get(backendurls.userprofile, {
          headers: {
            'details': 'profesional_details', // Replace with your actual header and value
          },
        });
        
        if (response.data.message === 'success') {
          console.log(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfessiionaldetails();
},[])
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>profession</h4>
      
    </div>
  )
}

export default Professionaldetails