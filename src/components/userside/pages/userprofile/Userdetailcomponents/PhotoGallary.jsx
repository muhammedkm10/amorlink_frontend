import React,{useEffect,useState} from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import profile from '../../../../../assets/images/pppp.jpg';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import '../../../../../assets/css/sweetalert-custom.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';



function PhotoGallary() {
  const [details,setDetails] = useState({})
  const [isEditing,setIsEditing]  = useState(false)
  const [editDetails,setEditedDetails] = useState({})
  const [selectedImage,setSelectedImage] = useState({
    image2 : null,
    image3 : null,
    image4 : null,
    image5 : null
  })
  const [isdeleted,setIsdeleted]  = useState(false)
  

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
    },[isEditing,isdeleted])

     // handling edit button
     const handleEditButton = () =>{
      setIsEditing(true)
    }


    // setting editting data into state

    const handleChange = (e) =>{
        const {name,files} = e.target
        if (files && files[0]){
          const reader  = new FileReader()
          reader.onloadend = () =>{

            setEditedDetails({
              ...editDetails,
              [name] : reader.result,
            });

            setSelectedImage({
              ...selectedImage,
              [name]:reader.result           
             })
          }
          reader.readAsDataURL(files[0]);
        }
  }


  // saving the data to the data base to store in the database

  const handleSave  = async () =>
    {
      const response = await authentcatedApiClient.put(backendurls.userprofile,editDetails,{
        headers :{
          "details" : "photos_gallary"
        }
      })
      if (response.data.message == "success")
        {
          Swal.fire({
            title: 'Edited successfully',
            text: 'Images added successfully to your gallary',
            icon: 'success',
            customClass: {
                popup: 'my-custom-popup-class',
                title: 'my-custom-title-class',
                content: 'my-custom-content-class',
            
            },
        });
      setIsEditing(false)
      setSelectedImage({})


        }


    }
    

  

    // going back to details component
    const gobacktodetails = () =>{
      setIsEditing(false)
    }
  
// checking any image is present or not
  const hasImages = details.image2 || details.image3 || details.image4 || details.image5;

// handling the deletion of the image

const deleteImage = async (img,name) =>{

      const response = await authentcatedApiClient.delete(backendurls.userprofile,{
        data :{"img":img,'name':name}
      })
      if (response.data.message == "success")
        {
          
          Swal.fire({
            title: 'Deleted  successfully',
            text: 'Image deleted  successfully from your gallary',
            icon: 'info',
            customClass: {
                popup: 'my-custom-popup-class',
                title: 'my-custom-title-class',
                content: 'my-custom-content-class',
            
            },
        });
      setIsdeleted(!isdeleted)

        }
}

  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>PhotoGallary</h4>
 

 {/* editing part */}

        {isEditing ? (
           <div className={`container  ${styles.gallary}`}>
              <div className="row">

                  <div className="col-md-6 col-12 p-4 ">
                  {selectedImage.image2 ? (
                <img src={selectedImage.image2} alt="Selected" className={styles.selectedImage} />):   <img src={profile} alt="Selected" className={styles.selectedImage} ></img>}
                  <input type="file" id="file1" name="image2" className={styles.fileinput} onChange={handleChange} />
                  <label htmlFor="file1" className={styles.customFileLabel}>Choose File 1</label>



                     <div className="p-4"></div>
                  {selectedImage.image3 ? (
                <img src={selectedImage.image3} alt="Selected" className={styles.selectedImage}/>):  (<img src={profile} alt="Selected" className={styles.selectedImage}></img>)}

                  <input type="file" id="file2" name="image3" className={styles.fileinput} onChange={handleChange} />
                  <label htmlFor="file2" className={styles.customFileLabel}>Choose File 2</label>

                  </div>
                <div className="col-md-6 col-12 p-4 ">
                  {selectedImage.image4 ? (
                <img src={selectedImage.image4} alt="Selected" className={styles.selectedImage} />)  :(<img src={profile} alt="Selected" className={styles.selectedImage}></img>
                   )}

                  <input type="file" id="file3" name="image4" className={styles.fileinput} onChange={handleChange} />
                  <label htmlFor="file3" className={styles.customFileLabel}>Choose File 3</label>

                  <div className="p-4"></div>
                  {selectedImage.image5 ? (
                <img src={selectedImage.image5} alt="Selected" className={styles.selectedImage} /> 
                   ): (<img src={profile} alt="Selected" className={styles.selectedImage}></img>)}
                  <input type="file" id="file4" name="image5" className={styles.fileinput} onChange={handleChange} />
                  <label htmlFor="file4" className={styles.customFileLabel}>Choose File 4</label>
                        <div>
                            <button className={styles.savebutton} onClick={handleSave}>Save</button>
                            <button className={styles.savebutton} onClick={gobacktodetails}>Go back</button>

                        </div>
                    </div>
              </div>
         </div>
        ):(
          
          // gallary part 
          
          
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
             <Link to="" className="m-5"onClick={handleEditButton}><i className="fa fa-edit  text-white mt-5" title='Edit'>edit</i></Link>
        </div>
      )}
    </div>
  )
}

export default PhotoGallary





             