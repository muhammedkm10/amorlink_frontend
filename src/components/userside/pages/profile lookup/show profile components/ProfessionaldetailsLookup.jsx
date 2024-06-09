import React ,{useEffect, useState}from 'react'
import styles from './common1.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import '../../../../../assets/css/sweetalert-custom.css'


function ProfessionaldetailsLookup({userid}) {
  const [details,setDetails] = useState({})


  useEffect(()=>{
  
    const fetchProfessiionaldetails= async () => {
      try {
        const response = await authentcatedApiClient.get(backendurls.userprofile, {
          headers: {
            "userid":userid,
            'details': 'profesional_details', 
          },
        });
        
        if (response.data.message === 'success') {
          setDetails(response.data.profesional_details)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfessiionaldetails();
},[])

  


  return (
    <div className={styles.outerwrapper}>
        <h4 className={styles.heading}>profession</h4>
          <div>
        <div className={`container ${styles.basic_details}`}>
          <div className="row">
            <div className="col-lg-6 col-12 px-5">
              <table className={`${styles.tableBackgroundAlternate}`}>
                <tbody>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Employed in:</td>
                    <td className={styles.info}>{!details.employed_in ? "Not specified" : details.employed_in}</td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Annual Income:</td>
                    <td className={styles.info}>{!details.annual_income ? "Not specified" : details.annual_income}</td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Education:</td>
                    <td className={styles.info}>{!details.highest_education ? "Not specified" : details.highest_education}</td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Education in detail:</td>
                    <td className={styles.info}>{!details.education_in_details ? "Not specified" : details.education_in_details}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-6 col-12 px-5">
              <table className={` ${styles.tableBackgroundAlternate}`}>
                <tbody>
                  <tr className={styles.rows}>
                    <td className={styles.items}>College:</td>
                    <td className={styles.info}>{!details.college ? "Not specified" : details.college}</td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Occupation:</td>
                    <td className={styles.info}>{!details.occupation ? "Not specified" : details.occupation}</td>
                  </tr>
                  <tr  className={styles.rows}>
                    <td className={styles.items}>Organization:</td>
                    <td className={styles.info}>{!details.organization ? "Not specified" : details.organization}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        </div>
    </div>
  )
}

export default ProfessionaldetailsLookup