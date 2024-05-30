import React ,{useEffect,useState}from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'


function ReligionInformation() {
  const [details,setDetails] = useState({})
  const [isEditing,setIsEditing]  = useState(false)
  const [editDetails,setEditedDetails] = useState({})


    useEffect(()=>{
  
        const fetchReligionalInformation= async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'religional_information', // Replace with your actual header and value
              },
            });
            
            if (response.data.message === 'success') {
              console.log(response.data.religional_information)
              setDetails(response.data.religional_information)
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchReligionalInformation();
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
        <h4 className={styles.heading}>ReligionInformation</h4>
        {isEditing ? (
           <div className={`container-fluid  ${styles.basic_details}`}>
              <div className="row">
                  <div className="col-12 px-5">
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
                      <label className={styles.label}>No of married brothers: </label>
                      <input  className={styles.inputfield} type="number"   name="no_of_brothers_married"   value={editDetails.no_of_brothers_married || ''}   onChange={handleChange}/>
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
              <h4 className={styles.items}>Religion : <span className={styles.info}>{!details.religion ? "null" : details.religion}</span></h4>
              <h4 className={styles.items}>Cast  : <span className={styles.info}>{!details.cast  ? "None" : details.cast}</span></h4> 
              <h4 className={styles.items}>Time of Birth  : <span className={styles.info}> {!details.time_of_birth ? "None" : details.time_of_birth}</span></h4>
              <h4 className={styles.items}>Place of Birth : <span className={styles.info}> {!details.place_of_birth ? "None" : details.place_of_birth}</span></h4>
             
        </div>
        <Link to="" className="m-3"onClick={handleEditButton}><i className="fa fa-edit  text-white" title='Edit'>edit</i></Link>
        </div>)}
    </div>
  )
}

export default ReligionInformation