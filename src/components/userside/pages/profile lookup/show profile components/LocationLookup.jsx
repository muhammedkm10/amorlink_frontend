import React ,{useEffect,useState}from 'react'
import styles from './common1.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'
import statesData from '../../../../../assets/states'
import Swal from 'sweetalert2';
import '../../../../../assets/css/sweetalert-custom.css'



function LocationLookup() {
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
      setEditedDetails(details)
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
                      <input  className={styles.inputfield} type="text"   name="ancesters_origin"  value={editDetails.ancesters_origin || ''}   onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 px-5">
                 
                    <div>
                      <label className={styles.label}>City: </label>
                      <input  className={styles.inputfield} type="text"   name="city"   value={editDetails.city || ''}   onChange={handleChange}/>
                    </div>
                    <div>
                      <label className={styles.label}>Woriking in : </label>
                      <input  className={styles.inputfield} type="text"   name="work_place"   value={editDetails.work_place || ''}   onChange={handleChange}/>
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
              <div className="col-lg-6 col-12 p-0">
                <table className={` ${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>State</td>
                      <td className={styles.info}>{!details.state ? "Not specified" : details.state}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>District</td>
                      <td className={styles.info}>{!details.district ? "Not specified" : details.district}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Ancesters origin</td>
                      <td className={styles.info}>{!details.ancesters_origin ? "Not specified" : details.ancesters_origin}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-6 col-12 p-0">
                <table className={` ${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>City</td>
                      <td className={styles.info}>{!details.city ? "Not specified" : details.city}</td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Working in</td>
                      <td className={styles.info}>{!details.work_place ? "Not specified" : details.work_place}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Link to="" className="m-3"><i onClick={handleEditButton} className="fa fa-edit  text-white p-5" title='Edit'>edit</i></Link>
          </div>
        )}
        
    </div>
  )
}

export default LocationLookup











   