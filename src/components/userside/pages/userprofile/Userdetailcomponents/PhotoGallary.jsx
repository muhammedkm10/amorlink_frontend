import React,{useEffect,useState} from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import profile from '../../../../../assets/images/pppp.jpg';
import {Link} from 'react-router-dom'



function PhotoGallary() {
  const [details,setDetails] = useState({})
  const [isEditing,setIsEditing]  = useState(false)
  const [editDetails,setEditedDetails] = useState({})

    useEffect(()=>{
  
        const fetchPhotoGalary = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'photos_gallary', // Replace with your actual header and value
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

     // handling edit button
     const handleEditButton = () =>{
      setIsEditing(true)
    }


    // setting editting data into state

    const handleChange = (e) =>{
        const {name,value} = e.target
    setEditedDetails(
      {...editDetails,
        [name]:value
       }
    )
  }



  // saving the data to the data base to store in the database

  const handleSave  =() =>{
    setIsEditing(false)
  console.log(editDetails)
    

  }
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>PhotoGallary</h4>


        {isEditing ? (
           <div className={`container-fluid  ${styles.basic_details}`}>
              <div className="row">
                  <div className="col-lg-6 col-12 px-5">
                  </div>
                 
                  <div className="col-lg-6 col-12 px-5">
                        <div>
                            <button className={styles.savebutton} onClick={handleSave}>Save</button>
                        </div>
                    </div>
              </div>
         </div>
        ):(
          <div>
        <div className={`container-fluid  p-2${styles.gallary}`}>
        <div className={`row `}>
           <div className={`col-md-6 col-12  ${styles.firstpart}`}>
                      <div>
                    <img src={details.image2 || profile} 
                        alt="image2" 
                        className={` ${styles.images}`} 
                      />
                      </div>
                    <div className="">
                      <img 
                        src={details.image3 || profile} 
                        alt="image3" 
                        className={`${styles.images}`} 
                      />
                    </div>
          </div>
          
              <div className={`col-md-6 col-12  ${styles.secondpart}`}>
                      <div className="">
                        <img 
                          src={details.image4 || profile} 
                          alt="image4" 
                          className={` ${styles.images}`} 
                        />
                      </div>
                      <div className="">
                        <img 
                          src={details.image5 || profile} 
                          alt="image5" 
                          className={` ${styles.images}`} 
                        /> 
                      </div>
            </div>
      </div>
        </div>
        <Link to="" className="m-3"onClick={handleEditButton}><i className="fa fa-edit  text-white" title='Edit'>edit</i></Link>
        </div>
      )}
    </div>
  )
}

export default PhotoGallary





             