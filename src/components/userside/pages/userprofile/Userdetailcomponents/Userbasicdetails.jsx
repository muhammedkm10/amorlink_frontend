import React, { useEffect, useState } from 'react'
import styles from './common.module.css'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import {Link} from 'react-router-dom'



function BasicDetails({user}) {
  const [basicdetails,setBasicdetails] = useState({})
  const [isEditing,setIsEditing]  = useState(false)
  const [editDetails,setEditedDetails] = useState({})

  useEffect(()=>{
  
      const fetchBasicDetails = async () => {
        try {
          const response = await authentcatedApiClient.get(backendurls.userprofile, {
            headers: {
              'details': 'basic_details', // Replace with your actual header and value
            },
          });
          
          if (response.data.message === 'success') {
            setBasicdetails(response.data.basic_details);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchBasicDetails();
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
        <h4 className={styles.heading}>Basic detais</h4>

        {isEditing ? (
           <div className={`container-fluid  ${styles.basic_details}`}>
              <div className="row">
                  <div className="col-lg-4 col-12 px-5">
                  <div>
                      <label className={styles.label}>No of married brothers: </label>
                      <input  className={styles.inputfield} type="number"   name="no_of_brothers_married"   value={editDetails.no_of_brothers_married || ''}   onChange={handleChange}/>
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
                      <label className={styles.label}>No of married brothers: </label>
                      <input  className={styles.inputfield} type="number"   name="no_of_brothers_married"   value={editDetails.no_of_brothers_married || ''}   onChange={handleChange}/>
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
                     
                    </div><div>
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
            <div className="col-lg-4 col-6 px5">
             <h4 className={styles.items}>Email :  <span className={styles.info}> {!user.email ? "null" : user.email}</span></h4>
              <h4 className={styles.items}>Phone :   <span className={styles.info}>{!user.phone ? "null" : user.phone}</span></h4>
              <h4 className={styles.items}>Marital status :   <span className={styles.info}>{!basicdetails.marital_status ? "null" : basicdetails.marital_status}</span></h4>
              <h4 className={styles.items}>Date of Birth :   <span className={styles.info}>{!basicdetails.dob  ? "None" : basicdetails.dob}</span></h4> 
            </div>
            <div className="col-lg-4 col-6 px5">
              <h4 className={styles.items}>Height :   <span className={styles.info}>{!basicdetails.height ? "None" : basicdetails.height}</span></h4>
              <h4 className={styles.items}>Weight :   <span className={styles.info}>{!basicdetails.weight ? "None" : basicdetails.weight}</span></h4>
              <h4 className={styles.items}>Body type :   <span className={styles.info}>{!basicdetails.body_type ? "None" :basicdetails.body_type }</span></h4>
              <h4 className={styles.items}>Physical status :  <span className={styles.info}> {!basicdetails.physical_status ? "None" :basicdetails.physical_status}</span></h4>
              </div>
          <div className="col-lg-4 col-6 px5">
              <h4 className={styles.items}>Drinking Habits :   <span className={styles.info}>{!basicdetails.drinking_habits ? "None" :basicdetails.drinking_habits}</span></h4>
              <h4 className={styles.items}>Eating Habits :   <span className={styles.info}>{!basicdetails.eating_habits ? "None" :basicdetails.eating_habits}</span></h4>
              <h4 className={styles.items}>Smoking Habits :   <span className={styles.info}>{!basicdetails.smalking_habits ? "None" :basicdetails.smalking_habits }</span></h4>
              <h4 className={styles.items}>Hobbies :   <span className={styles.info}>{!basicdetails.hobbies ? "None" :basicdetails.hobbies}</span></h4>
             </div>
             
          </div>

        </div>
        <Link to="" className="m-3"  onClick={handleEditButton}><i className="fa fa-edit  text-white" title='Edit'>edit</i></Link>
        </div>
        )}
    </div>
  )
}

export default BasicDetails