import React ,{useEffect, useState}from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'

function Professionaldetails() {
  const [details,setDetails] = useState({})
  const [isEditing,setIsEditing]  = useState(false)
  const [editDetails,setEditedDetails] = useState({})

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
          setDetails(response.data.profesional_details)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfessiionaldetails();
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
        <h4 className={styles.heading}>profession</h4>

        {isEditing ? (
           <div className={`container-fluid  ${styles.basic_details}`}>
              <div className="row">
                  <div className="col-lg-6 col-12 px-5">
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
                      <label className={styles.label}>About my family: </label>
                      <textarea  className={styles.textarea}  name="about_family" value={editDetails.about_family || ''}  onChange={handleChange} />
                    </div>
                  </div>
                 
                  <div className="col-lg-6 col-12 px-5">

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
                  <div className="col-lg-6 col-12 px-5"> 
                        <h4 className={styles.items}>Employed in : <span className={styles.info}>{!details.employed_in ? "null" : details.employed_in}</span></h4>
                        <h4 className={styles.items}>Annual Income  : <span className={styles.info}>{!details.annual_income  ? "None" : details.annual_income}</span></h4> 
                        <br />
                        <h4 className={styles.items}>Education  :  <span className={styles.info}>{!details.highest_education ? "None" : details.highest_education}</span></h4>
                        <h4 className={styles.items}>Education in detail: <span className={styles.info}> {!details.education_in_details ? "None" : details.education_in_details}</span></h4></div>
                  <div className="col-lg-6 col-12 px-5">              
                        <h4 className={styles.items}>College : <span className={styles.info}> {!details.college ? "None" : details.college}</span></h4>
                        <h4 className={styles.items}>Occupation : <span className={styles.info}> {!details.occupation ? "None" : details.occupation}</span></h4>
                        <h4 className={styles.items}>Organization : <span className={styles.info}> {!details.organization ? "None" : details.organization}</span></h4>
                  </div>
             </div>
        </div>
        <Link to="" className="m-3"onClick={handleEditButton}><i className="fa fa-edit  text-white" title='Edit'>edit</i></Link>
        </div>
        )}
    </div>
  )
}

export default Professionaldetails