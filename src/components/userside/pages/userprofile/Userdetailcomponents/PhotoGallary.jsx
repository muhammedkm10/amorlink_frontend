import React,{useEffect} from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'

function PhotoGallary() {

    useEffect(()=>{
  
        const fetchPhotoGalary = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'photos_gallary', // Replace with your actual header and value
              },
            });
            
            if (response.data.message === 'success') {
              console.log(response.data)
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchPhotoGalary();
    },[])
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>PhotoGallary</h4>
      
    </div>
  )
}

export default PhotoGallary