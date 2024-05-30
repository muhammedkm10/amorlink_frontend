import React ,{useEffect,useState}from 'react'
import styles from './common.module.css'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import { Link } from 'react-router-dom'
import Userdropdown from '../../../common/Userdropdown'

function FamilyDetails() {
  const [details,setDetails] = useState({})
  const [isEditing,setIsEditing] = useState(false)
  const [editDetails,setEditedDetails] = useState({})

// fetching the data from the backend to show in the family details section
    useEffect(()=>{
  
        const fetchFamilyDetails = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'family_details', // Replace with your actual header and value
              },
            });
            
            if (response.data.message === 'success') {
              setDetails(response.data.family_details)

            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchFamilyDetails();
    },[])


    // edit details handle function

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
    <div className={`${styles.outerwrapper}`}>
      <div className={styles.headers}>
        <h4 className={styles.heading}>Family Details</h4>
      </div>
      {isEditing ? (
        <div className={`container-fluid  ${styles.basic_details}`}>
          <div className="row">
              <div className="col-lg-4 col-12 px-5">
              <div className={styles.dropdownwrap}>
                        <label className={styles.label}>Family status: </label>
                        <select className={styles.dropdown} name="family_status" id="" defaultChecked={editDetails.family_status || "None"} onChange={handleChange} >
                        <option value="" selected>{details.family_status}</option>
                        <option value="upper middle">Upper middle</option>
                        <option value="high class">High class</option>
                        <option value="rich/affluent">Rich/affluent</option>
                        <option value="Others">Others</option>
                        </select>
                    </div>



                    <div>
                      <label className={styles.label}>Family value: </label>
                      <select className={styles.dropdown} name="family_value" id="" defaultChecked={details.family_value || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_value || "None"}</option>
                        <option value="Orthodox">Orthodox</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Modern">Modern</option>
                        <option value="liberal">liberal</option>
                        <option value="Others">Others</option>
                        </select>
                    </div>



                    <div>
                      <label className={styles.label}>Family type: </label>
                      <select className={styles.dropdown} name="family_value" id="" defaultChecked={details.family_type || "None"} onChange={handleChange} >
                        <option value=""selected>{details.family_type || "None"}</option>
                        <option value="Joint family">Joint family</option>
                        <option value="Nuclear family">Nuclear family</option>
                        <option value="Others">Others</option>
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
                      <label className={styles.label}>No of married brothers: </label>
                      <input  className={styles.inputfield} type="number"   name="no_of_brothers_married"   value={editDetails.no_of_brothers_married || ''}   onChange={handleChange}/>
                    </div>
                    <div>
                      <label className={styles.label}>No of sisters: </label>
                      <input className={styles.inputfield} type="number" name="no_of_sisters"  value={editDetails.no_of_sisters || ''}   onChange={handleChange} />
                    </div>


                    <div>
                      <label className={styles.label}>No of sisters married: </label>
                      <input className={styles.inputfield}  type="number" name="no_of_sisters_married" value={editDetails.no_of_sisters_married || ''} onChange={handleChange}/>
                    </div>


                   
              </div>
              <div className="col-lg-4 col-12 px-5">
                    <div>
                      <label className={styles.label}>About my family: </label>
                      <textarea  className={styles.textarea}  name="about_family" value={editDetails.about_family || ''}  onChange={handleChange} />
                    </div>
                     <div>
                            <button className={styles.savebutton} onClick={handleSave}>Save</button>
                     </div>
              </div>
          </div>
        </div>
      ) :(
        <div >
        <div className={`container-fluid  ${styles.basic_details}`}>
             <div className="row">
              <div className='col-lg-4 col-12 px-5 '>
                <h4 className={styles.items}>Family status : <span className={styles.info}>{!details.family_status ? "null" : details.family_status}</span></h4>
                <h4 className={styles.items}>Family value : <span className={styles.info}>{!details.family_value  ? "None" : details.family_value}</span></h4> 
                <h4 className={styles.items}>Family type  :  <span className={styles.info}>{!details.family_type ? "None" : details.family_type}</span></h4>
                <h4 className={styles.items}>Father occupation in detail: <span className={styles.info}> {!details.father_occupation ? "None" : details.father_occupation}</span></h4>
              </div>
              <div className='col-lg-4 col-12  px-5'> 
                <h4 className={styles.items}>Mother occupation :  <span className={styles.info}>{!details.mother_occupation ? "None" : details.mother_occupation}</span></h4>
                <h4 className={styles.items}>No of brotherd :  <span className={styles.info}>{!details.no_of_brothers ? "None" : details.no_of_brothers}</span></h4>
                <h4 className={styles.items}>No of married brothers : <span className={styles.info}> {!details.no_of_brothers_married ? "None" : details.no_of_brothers_married}</span></h4>
              </div>
              <div  className='col-lg-4 col-12 px-5'>
                <h4 className={styles.items}>No of sisters:  <span className={styles.info}>{!details.no_of_sisters ? "None" : details.no_of_sisters}</span></h4>
                <h4 className={styles.items}>No of sisters married :  <span className={styles.info}>{!details.no_of_sisters_married ? "None" : details.no_of_sisters_married}</span></h4>
                <h4 className={styles.items}>Family location :  <span className={styles.info}>{!details.family_location ? "None" : details.family_location}</span></h4>
                <h4 className={styles.items}>About my family : <span className={styles.info}> {!details.about_family ? "None" : details.about_family}</span></h4>
              </div>
                
               
              </div>
        </div>
        <Link className="m-3" onClick={handleEditButton}><i className="fa fa-edit  text-white" title='Edit'>edit</i></Link>
        </div>
      )}
    </div>
  )
}

export default FamilyDetails




