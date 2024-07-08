import React, { useEffect, useState } from 'react'
import styles from './common1.module.css'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../../assets/css/sweetalert-custom.css'
import '../../../../../assets/css/custom-toastify.css'

function FamilyDetailsLookup({ userid, subscribed }) {
  const [details, setDetails] = useState({})

  // fetching the data from the backend to show in the family details section
  useEffect(() => {
    const fetchFamilyDetails = async () => {
      try {
        const response = await authentcatedApiClient.get(
          backendurls.userprofile,
          {
            headers: {
              lookupuserid: userid,
              details: 'family_details',
              type: 'lookup',
            },
          },
        )

        if (response.data.message === 'success') {
          setDetails(response.data.family_details)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchFamilyDetails()
  }, [])

  return (
    <div className={`${styles.outerwrapper}`}>
      <div className={styles.headers}>
        <h4 className={styles.heading}>Family Details</h4>
      </div>

      <div>
        <div className={`container-fluid  ${styles.basic_details}`}>
          <div className="row">
            <div className="col-lg-6 col-12 p-0">
              <table className={` ${styles.tableBackgroundAlternate}`}>
                <tbody>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Family status </td>
                    <td className={styles.info}>
                      {!details.family_status
                        ? 'Not specified'
                        : details.family_status}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Father occupation </td>
                    <td className={styles.info}>
                      {' '}
                      {!details.father_occupation
                        ? 'Not specified'
                        : details.father_occupation}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Family value :</td>
                    <td className={styles.info}>
                      {!details.family_value
                        ? 'Not specified'
                        : details.family_value}{' '}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Mother occupation </td>
                    <td className={styles.info}>
                      {!details.mother_occupation
                        ? 'Not specified'
                        : details.mother_occupation}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Family type </td>
                    <td className={styles.info}>
                      {!details.family_type
                        ? 'Not specified'
                        : details.family_type}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>No of brothers </td>
                    <td className={styles.info}>
                      {!details.no_of_brothers
                        ? 'Not specified'
                        : details.no_of_brothers}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-6 col-12  p-0">
              <table className={` ${styles.tableBackgroundAlternate}`}>
                <tbody>
                  <tr className={styles.rows}>
                    <td className={styles.items}>No of married brothers :</td>
                    <td className={styles.info}>
                      {' '}
                      {!details.no_of_brothers_married
                        ? 'Not specified'
                        : details.no_of_brothers_married}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>No of sisters :</td>
                    <td className={styles.info}>
                      {!details.no_of_sisters
                        ? 'Not specified'
                        : details.no_of_sisters}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>No of sisters married :</td>
                    <td className={styles.info}>
                      {!details.no_of_sisters_married
                        ? 'Not specified'
                        : details.no_of_sisters_married}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Family location :</td>
                    <td className={styles.info}>
                      {!details.family_location
                        ? 'Not specified'
                        : details.family_location}{' '}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>About my family :</td>
                    <td className={styles.info1}>
                      {' '}
                      {!details.about_family
                        ? 'Not specified'
                        : details.about_family}
                    </td>
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

export default FamilyDetailsLookup
