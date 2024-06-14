import React ,{useEffect,useState}from 'react'
import styles from './common1.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import '../../../../../assets/css/sweetalert-custom.css'



function ReligionInformationLookup({userid,subscribed}) {
  const [details,setDetails] = useState({})


    useEffect(()=>{
  
        const fetchReligionalInformation= async () => {
          try {
            const response = await authentcatedApiClient.get(backendurls.userprofile, {
              headers: {
                'userid':userid,
                'details': 'religional_information', 
              },
            });
            
            if (response.data.message === 'success') {
              setDetails(response.data.religional_information)
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchReligionalInformation();
    },[])


  return (

    
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>ReligionInformation</h4>
        <div>
        <div className={`container ${styles.basic_details}`}>
            <table className={`${styles.tableBackgroundAlternate}`}>
              <tbody>
                <tr className={styles.rows}>
                  <td className={styles.items}>Religion:</td>
                  <td className={subscribed ? `${styles.info}`: `${styles.blurringinfo}`}>{!details.religion ? "Not specified" : details.religion}</td>
                </tr>
                <tr className={styles.rows}>
                  <td className={styles.items}>Cast:</td>
                  <td className={styles.info}>{!details.cast ? "Not specified" : details.cast}</td>
                </tr>
                <tr className={styles.rows}>
                  <td className={styles.items}>Time of Birth:</td>
                  <td className={styles.info}>{!details.time_of_birth ? "Not specified" : details.time_of_birth}</td>
                </tr>
                <tr className={styles.rows}>
                  <td className={styles.items}>Place of Birth:</td>
                  <td className={styles.info}>{!details.place_of_birth ? "Not specified" : details.place_of_birth}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        </div>
  )
}

export default ReligionInformationLookup