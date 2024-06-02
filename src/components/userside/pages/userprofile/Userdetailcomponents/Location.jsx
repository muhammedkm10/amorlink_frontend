import React ,{useEffect,useState}from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'
import statesData from '../../../../../assets/states'
import Swal from 'sweetalert2';
import '../../../../../assets/css/sweetalert-custom.css'



function Location() {
  const [details,setDetails] = useState({})
  const [isEditing,setIsEditing]  = useState(false)
  const [editDetails,setEditedDetails] = useState({})
  const [districts, setDistricts] = useState([]);




// fetching data from the backen
    useEffect(()=>{
  
        const fetchLocaitionDetails = async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'details': 'location_details', 
              },
            });
            
            if (response.data.message === 'success') {
              setDetails(response.data.location_details)
            }
          } catch (error) {
            console.log(error);
          }
        };
      //  fetching districts of already selected states
        District_function(details.state)
        fetchLocaitionDetails();
    },[isEditing])

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

  console.log(editDetails)


  // saving the data to the data base to store in the database

  const handleSave  = async () =>{
    const response = await authentcatedApiClient.put(backendurls.userprofile,editDetails,{
      headers :{
        "details" : "location_details"
      }
    })
    if (response.data.message == "success")
      {
        Swal.fire({
          title: 'Edited successfully',
          text: 'Details edited succesfully',
          icon: 'success',
          customClass: {
              popup: 'my-custom-popup-class',
              title: 'my-custom-title-class',
              content: 'my-custom-content-class',
          
          },
      });
       setIsEditing(false)

      }


  }




    // for finding the states name and the districts under the selected state

    // finding the states from the data
    const states = [
      
      ...statesData.map(state => ({
        label: state.state,
        value: state.state
      }))
    ];
    
    
    // finding the name of the districts from the data using the state name selected by this function
    
    const District_function = (value) => {
      console.log("fuction called")
      const selectedState = statesData.find(state => state.state === value);
      if (selectedState) {
        setDistricts([
          ...selectedState.districts.map(district => ({
            label: district,
            value: district
          }))
        ]);
      } 
    };

    console.log(districts)
    
// going back to details component
  const gobacktodetails = () =>{
    setIsEditing(false)
  }
  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>location detais</h4>


        {isEditing ? (
           <div className={`container-fluid  ${styles.basic_details}`}>

              <div className="row">
                  <div className="col-lg-6 col-12 px-5">
                  <div>
                    <label className={styles.label}>State: </label>
                      <select className={styles.dropdown} name="state" id="" defaultChecked={details.state || "Not specified"}onChange={(e)=>{handleChange(e) , District_function(e.target.value) }} >
                        <option value="" selected disabled>{details.state || "None"}</option>
                        {states.map(option => ( <option value={option.value}>{option.label}</option>))}
                        </select>
                     
                    </div>
                   
                   {/* {details.state} */}
                    <div>
                      
                    <label className={styles.label}>District: </label>
                      <select className={styles.dropdown} name="district" id="" defaultChecked={details.district || "Not specified"} onChange={handleChange} >
                        <option value=""selected disabled>{details.district || "None"}</option>
                        {districts.map(option => ( <option value={option.value}>{option.label}</option>))}
                            
                       </select>
                     
                    </div>
                    <div>
                      <label className={styles.label}>Ancesters origin : </label>
                      <input  className={styles.inputfield} type="text"   name="ancesters_origin"  placeholder={details.ancesters_origin || "Not specified"} value={editDetails.ancesters_origin || ''}   onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 px-5">
                 
                    <div>
                      <label className={styles.label}>City: </label>
                      <input  className={styles.inputfield} type="text"   name="city" placeholder={details.city || "Not specified"}   value={editDetails.city || ''}   onChange={handleChange}/>
                    </div>
                    <div>
                      <label className={styles.label}>Woriking in : </label>
                      <input  className={styles.inputfield} type="text"   name="work_place" placeholder={details.work_place || "Not specified"}   value={editDetails.work_place || ''}   onChange={handleChange}/>
                    </div>
                        <div>
                            <button className={styles.savebutton} onClick={handleSave}>Save</button>
                            <button className={styles.savebutton} onClick={gobacktodetails}>Go back</button>

                        </div>
                    </div>
              </div>
         </div>
        ):(
          <div>
          <div className={`container-fluid ${styles.basic_details}`}>
              <div className="row">
                <div className="col-lg-6 col-12 px-5">
                <h4 className={styles.items}>State: <span className={styles.info}>{!details.state ? "Not specified" : details.state}</span></h4>
                <br/>
  
                <h4 className={styles.items}>District   : <span className={styles.info}>{!details.district  ? "Not specified" : details.district}</span></h4>
                <h4 className={styles.items}>Ancesters origin  : <span className={styles.info}> {!details.ancesters_origin ? "Not specified" : details.ancesters_origin}</span></h4>
                </div>
                <div className="col-lg-6 col-12 px-5">
                <h4 className={styles.items}>City: <span className={styles.info}> {!details.city ? "Not specified" : details.city}</span></h4>
                <br/>
                <h4 className={styles.items}>Woriking in :  <span className={styles.info}>{!details.work_place ? "Not specified" : details.work_place}</span></h4>
                </div>
              </div>
               
          </div>
          <Link to="" className="m-3"><i onClick={handleEditButton} className="fa fa-edit  text-white" title='Edit'>edit</i></Link>
          </div>
        )}
        
    </div>
  )
}

export default Location