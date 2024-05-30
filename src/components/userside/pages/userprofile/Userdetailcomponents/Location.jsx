import React ,{useEffect,useState}from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'

function Location() {
  const [details,setDetails] = useState({})
  const [isEditing,setIsEditing]  = useState(false)
  const [editDetails,setEditedDetails] = useState({})


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
    
        fetchLocaitionDetails();
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
        <h4 className={styles.heading}>location detais</h4>


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
          <div className={`container-fluid ${styles.basic_details}`}>
              <div className="row">
                <div className="col-lg-6 col-12 px-5">
                <h4 className={styles.items}>State: <span className={styles.info}>{!details.state ? "null" : details.state}</span></h4>
                <br/>
  
                <h4 className={styles.items}>District   : <span className={styles.info}>{!details.district  ? "None" : details.district}</span></h4>
                <h4 className={styles.items}>Ancesters origin  : <span className={styles.info}> {!details.ancesters_origin ? "None" : details.ancesters_origin}</span></h4>
                </div>
                <div className="col-lg-6 col-12 px-5">
                <h4 className={styles.items}>City: <span className={styles.info}> {!details.city ? "None" : details.city}</span></h4>
                <br/>
                <h4 className={styles.items}>Woriking in :  <span className={styles.info}>{!details.work_place ? "None" : details.work_place}</span></h4>
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