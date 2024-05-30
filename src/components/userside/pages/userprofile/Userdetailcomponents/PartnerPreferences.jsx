import React,{useEffect, useState} from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'

function PartnerPreferences() {
  const [details,setDetails] = useState({})
  const [isEditing,setIsEditing]  = useState(false)
  const [editDetails,setEditedDetails] = useState({})

    useEffect(()=>{
  
        const fetchPartnerPreference = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'partner_preferences', // Replace with your actual header and value
              },
            });
            
            if (response.data.message === 'success') {
              setDetails(response.data.partner_preferences)
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchPartnerPreference();
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
        <h4 className={styles.heading}>PartnerPreferences</h4>


        {isEditing ? (
           <div className={`container-fluid  ${styles.basic_details}`}>
              <div className="row">
                  <div className="col-lg-4 col-12 px-5">
                  <div>
                      <label className={styles.label}>Age: </label>
                      <input  className={styles.inputfield} type="number"   name="patner_age"   value={editDetails.patner_age || ''}   onChange={handleChange}/>
                    </div>
                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>
                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>
                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>
                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>

                  </div>


                  <div className="col-lg-4 col-12 px-5">
                  <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>

                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>
                      

                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>


                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>

                  </div>
                  <div className="col-lg-4 col-12 px-5">

                  <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>

                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>

                    <div>
                    <label className={styles.label}>Family location: </label>
                      <select className={styles.dropdown} name="family_location" id="" defaultChecked={details.family_location || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_location || "None"}</option>
                        <option value="Same as my location">Same as my location</option>
                        <option value="Another location">Another location</option>
                        </select>
                     
                    </div>





                        <div>
                          <label className={styles.label}>About my partner: </label>
                          <textarea  className={styles.textarea}  name="about_partner" value={editDetails.about_partner || ''}  onChange={handleChange} />
                        </div>
                        <div>
                            <button className={styles.savebutton} onClick={handleSave}>Save</button>
                        </div>
                    </div>
              </div>
         </div>
        ):(
        
        <div>
          <div className={`container ${styles.basic_details}`}>
          <div className="row">
            <div className="col-md-4 col-12 ">
              <h4 className={styles.items}>Age: <span className={styles.info}>{!details.patner_age ? "None" : details.patner_age}</span></h4>
              <h4 className={styles.items}>Height  : <span className={styles.info}>{!details.height  ? "None" : details.height}</span></h4> 
              <h4 className={styles.items}>Marital status  :  <span className={styles.info}>{!details.marital_status ? "None" : details.marital_status}</span></h4>
              <h4 className={styles.items}>Mother toungue:  <span className={styles.info}>{!details.mother_toungue ? "None" : details.mother_toungue}</span></h4>
              <h4 className={styles.items}>Eating Habits  :  <span className={styles.info}>{!details.eating_habits ? "None" : details.eating_habits}</span></h4>
            </div>
            <div className="col-md-4 col-12">
              <h4 className={styles.items}>Physical status  :  <span className={styles.info}>{!details.physical_status ? "None" : details.physical_status}</span></h4>
              <h4 className={styles.items}>Drinking habits:  <span className={styles.info}>{!details.drinking_habits ? "None" : details.drinking_habits}</span></h4>
              <h4 className={styles.items}>Smoking habits  :  <span className={styles.info}>{!details.smalking_habits ? "None" : details.smalking_habits}</span></h4>
              <h4 className={styles.items}>Religion:  <span className={styles.info}>{!details.religion ? "None" : details.religion}</span></h4>
              <h4 className={styles.items}>Cast :  <span className={styles.info}>{!details.cast ? "None" : details.cast}</span></h4>
            </div>
            <div className="col-md-4 col-12">
              <h4 className={styles.items}>Highest Education:  <span className={styles.info}>{!details.highest_education ? "None" : details.highest_education}</span></h4>
              <h4 className={styles.items}>Employed in  :  <span className={styles.info}>{!details.employed_in ? "None" : details.employed_in}</span></h4>
              <h4 className={styles.items}>Annual income:  <span className={styles.info}>{!details.annual_income ? "None" : details.annual_income}</span></h4>
              <h4 className={styles.items}>About partner :  <span className={styles.info}>{!details.about_partner ? "None" : details.about_partner}</span></h4>
            </div>
          </div>
        </div>
        <Link to=""className="m-3" onClick={handleEditButton}><i className="fa fa-edit  text-white" title='Edit'>edit</i></Link>
        </div>
        )}
        
      
    </div>
  )
}

export default PartnerPreferences