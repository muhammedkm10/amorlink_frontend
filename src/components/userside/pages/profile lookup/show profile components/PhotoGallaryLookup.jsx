import React,{useEffect,useState} from 'react'
import styles from './common1.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import profile from '../../../../../assets/images/pppp.jpg';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import '../../../../../assets/css/sweetalert-custom.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';



function PhotoGallaryLookup({userid}) {
  const [details,setDetails] = useState({})

    useEffect(()=>{
  
        const fetchPhotoGalary = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                "userid":userid,
                'details': 'photos_gallary',
              },
            });
            
            if (response.data.message === 'success') {
              setDetails(response.data.photos_gallary)
            
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchPhotoGalary();
    },[])

 
  
// checking any image is present or not
  const hasImages = details.image2 || details.image3 || details.image4 || details.image5;



  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>PhotoGallary</h4>

          {/* gallary part  */}
          
          
          <div>
          
        <div className={`container-fluid  p-2${styles.gallary}`}>
     {
      hasImages ? (
        <div className={`row `}>
           <div className={`col-md-6 col-12  ${styles.firstpart}`}>
                      <div className={styles.imgwrapper}>
                          <img src={details.image2 ? `${import.meta.env.VITE_IMAGE}${details.image2}`: profile} 
                              alt="image2" 
                              className={` ${styles.images}`} 
                            />
                            {details.image2 && 
                            <button className={styles.deleteButton} title='delete' onClick={()=>deleteImage(details.image2,"image2")}>
                                <FontAwesomeIcon icon={faTrash} />
                              </button>}
                            
                      </div>
                    <div className={styles.imgwrapper}>
                      <img 
                        src={details.image3 ? `${import.meta.env.VITE_IMAGE}${details.image3}` :profile} 
                        alt="image3" 
                        className={`${styles.images}`} 
                      />
                      {details.image3 &&
                      <button className={styles.deleteButton} title='delete'  onClick={()=>deleteImage(details.image3,"image3")}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button> } 
                    </div>
          </div>
          
              <div className={`col-md-6 col-12  ${styles.secondpart}`}>
                      <div className={styles.imgwrapper}>
                        <img 
                          src={details.image4 ?`${import.meta.env.VITE_IMAGE}${details.image4}`: profile} 
                          alt="image4" 
                          className={` ${styles.images}`} 
                        />
                        {details.image4 && 
                        <button className={styles.deleteButton}  title='delete' onClick={()=>deleteImage(details.image4,"image4")}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>}
                      </div>
                      <div className={styles.imgwrapper}>
                        <img 
                          src={details.image5 ?`${import.meta.env.VITE_IMAGE}${details.image5}`: profile} 
                          alt="image5" 
                          className={` ${styles.images}`} 
                        /> 
                        {details.image5 &&
                        <button className={styles.deleteButton} title='delete'  onClick={()=>deleteImage(details.image5,"image5")}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button> }
                        
                      </div>
            </div>
      </div>
      ):(
        <p>no photos available....!</p>
        

      )
     }
        </div>
        </div>
    </div>
  )
}

export default PhotoGallaryLookup





             