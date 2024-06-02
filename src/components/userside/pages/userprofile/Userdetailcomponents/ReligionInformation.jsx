import React ,{useEffect,useState}from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import '../../../../../assets/css/sweetalert-custom.css'



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



// saving the data to the data base to store in the database

const handleSave  = async() =>{
  const response = await authentcatedApiClient.put(backendurls.userprofile,editDetails,{
    headers :{
      "details" : "religional_information"
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

  // going back to details component
  const gobacktodetails =  () =>{
    setIsEditing(false)
  }
  return (

    
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>ReligionInformation</h4>
        {isEditing ? (
           <div className={`container-fluid  ${styles.basic_details}`}>
              <div className="row">
                  <div className="col-12 px-5">
                  <div>
                    <label className={styles.label}>Religion: </label>
                      <select className={styles.dropdown} name="religion" id="" defaultChecked={details.religion || "None"} onChange={handleChange} >
                        <option value=""selected>{details.religion || "None"}</option>
                        <option value="Hinduism">Hinduism</option>
                        <option value="Islam">Islam</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Sikhism">Sikhism</option>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Jainism">Jainism</option>
                        <option value="Zoroastrianism">Zoroastrianism</option>
                        <option value="Judaism">Judaism</option>
                        <option value="Bahá'í Faith">Bahá'í Faith</option>
                        <option value="Sarnaism">Sarnaism</option>
                        <option value="Other Indigenous Religions">Other Indigenous Religions</option>
                        <option value="Atheism">Atheism</option>
                        <option value="Agnosticism">Agnosticism</option>
                        <option value="Irreligion">Irreligion</option>
                        <option value="Others">Others</option>
                        </select>
                     
                    </div>
                    <div>
                    <label className={styles.label}>Cast: </label>
                      <select className={styles.dropdown} name="cast" id="" defaultChecked={details.cast || "None"} onChange={handleChange} >
                        <option value=""selected>{details.cast || "None"}</option>
                        <option value="Brahmin">Brahmin</option>
                        <option value="Kshatriya">Kshatriya</option>
                        <option value="Vaishya">Vaishya</option>
                        <option value="Shudra">Shudra</option>
                        <option value="Jat">Jat</option>
                        <option value="Yadav">Yadav</option>
                        <option value="Gujjar">Gujjar</option>
                        <option value="Ahir">Ahir</option>
                        <option value="Kurmi">Kurmi</option>
                        <option value="Rajput">Rajput</option>
                        <option value="Bania">Bania</option>
                        <option value="Kayastha">Kayastha</option>
                        <option value="Maratha">Maratha</option>
                        <option value="Patel">Patel</option>
                        <option value="Reddy">Reddy</option>
                        <option value="Patil">Patil</option>
                        <option value="Gounder">Gounder</option>
                        <option value="Naicker">Naicker</option>
                        <option value="Chettiar">Chettiar</option>
                        <option value="Mudaliar">Mudaliar</option>
                        <option value="Nair">Nair</option>
                        <option value="Menon">Menon</option>
                        <option value="Pillai">Pillai</option>
                        <option value="Thakur">Thakur</option>
                        <option value="Chaudhary">Chaudhary</option>
                        <option value="Jha">Jha</option>
                        <option value="Goswami">Goswami</option>
                        <option value="Rout">Rout</option>
                        <option value="Das">Das</option>
                        <option value="Pattanaik">Pattanaik</option>
                        <option value="Sarkar">Sarkar</option>
                        <option value="Mandal">Mandal</option>
                        <option value="Barman">Barman</option>
                        <option value="Mahato">Mahato</option>
                        <option value="Dutta">Dutta</option>
                        <option value="Kar">Kar</option>
                        <option value="Ghosh">Ghosh</option>
                        <option value="Kundu">Kundu</option>
                        <option value="Bose">Bose</option>
                        <option value="Mitra">Mitra</option>
                        <option value="Pal">Pal</option>
                        <option value="Sharma">Sharma</option>
                        <option value="Verma">Verma</option>
                        <option value="Singh">Singh</option>
                        <option value="Yadav">Yadav</option>
                        <option value="Maurya">Maurya</option>
                        <option value="Kumar">Kumar</option>
                        <option value="Bhattacharya">Bhattacharya</option>
                        <option value="Sinha">Sinha</option>
                        <option value="Chakraborty">Chakraborty</option>
                        <option value="Others">Others</option>
                        </select>
                     
                    </div>
                  <div>
                      <label className={styles.label}>Time of Birth : </label>
                      <input  className={styles.inputfield} type="time"   name="time_of_birth"  placeholder={details.time_of_birth || 'Not specified'} value={editDetails.time_of_birth || ''}   onChange={handleChange}/>
                    </div>
                    <div>
                      <label className={styles.label}>Place of Birth </label>
                      <input  className={styles.inputfield} type="text"   name="place_of_birth"   placeholder={details.place_of_birth || 'Not specified'}value={editDetails.place_of_birth || ''}   onChange={handleChange}/>
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
        <div className={`container ${styles.basic_details}`}>
              <h4 className={styles.items}>Religion : <span className={styles.info}>{!details.religion ? "Not specified" : details.religion}</span></h4>
              <h4 className={styles.items}>Cast  : <span className={styles.info}>{!details.cast  ? "Not specified" : details.cast}</span></h4> 
              <h4 className={styles.items}>Time of Birth  : <span className={styles.info}> {!details.time_of_birth ? "Not specified" : details.time_of_birth}</span></h4>
              <h4 className={styles.items}>Place of Birth : <span className={styles.info}> {!details.place_of_birth ? "Not specified" : details.place_of_birth}</span></h4>
             
        </div>
        <Link to="" className="m-3"onClick={handleEditButton}><i className="fa fa-edit  text-white" title='Edit'>edit</i></Link>
        </div>)}
    </div>
  )
}

export default ReligionInformation