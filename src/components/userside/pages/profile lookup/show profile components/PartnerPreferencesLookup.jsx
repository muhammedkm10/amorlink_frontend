import React, { useEffect, useState } from 'react'
import styles from './common1.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'

function PartnerPreferencesLookup({ userid, subscribed }) {
  const [details, setDetails] = useState({})

  useEffect(() => {
    const fetchPartnerPreference = async () => {
      try {
        const response = await authentcatedApiClient.get(
          backendurls.userprofile,
          {
            headers: {
              lookupuserid: userid,
              details: 'partner_preferences',
              type: 'lookup',
            },
          },
        )

        if (response.data.message === 'success') {
          setDetails(response.data.partner_preferences)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchPartnerPreference()
  }, [])

  return (
    <div className={styles.outerwrapper}>
      <h4 className={styles.heading}>Partner Preferences</h4>
      <div>
        <div className={`container ${styles.basic_details}`}>
          <div className="row">
            <div className="col-md-4 col-12 p-0 ">
              <table className={` ${styles.tableBackgroundAlternate}`}>
                <tbody>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Age:</td>
                    <td className={styles.info}>
                      {!details.patner_age
                        ? 'Not specified'
                        : details.patner_age}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Height:</td>
                    <td className={styles.info}>
                      {!details.height ? 'Not specified' : details.height}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Marital status:</td>
                    <td className={styles.info}>
                      {!details.marital_status
                        ? 'Not specified'
                        : details.marital_status}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Mother tongue:</td>
                    <td
                      className={
                        subscribed ? `${styles.info}` : `${styles.blurringinfo}`
                      }
                    >
                      {!details.mother_toungue
                        ? 'Not specified'
                        : details.mother_toungue}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Eating Habits:</td>
                    <td
                      className={
                        subscribed ? `${styles.info}` : `${styles.blurringinfo}`
                      }
                    >
                      {!details.eating_habits
                        ? 'Not specified'
                        : details.eating_habits}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-4 col-12 p-0">
              <table className={` ${styles.tableBackgroundAlternate}`}>
                <tbody>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Physical status:</td>
                    <td className={styles.info}>
                      {!details.physical_status
                        ? 'Not specified'
                        : details.physical_status}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Drinking habits:</td>
                    <td className={styles.info}>
                      {!details.drinking_habits
                        ? 'Not specified'
                        : details.drinking_habits}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Smoking habits:</td>
                    <td className={styles.info}>
                      {!details.smalking_habits
                        ? 'Not specified'
                        : details.smalking_habits}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Religion:</td>
                    <td
                      className={
                        subscribed ? `${styles.info}` : `${styles.blurringinfo}`
                      }
                    >
                      {!details.religion ? 'Not specified' : details.religion}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Cast:</td>
                    <td className={styles.info}>
                      {!details.cast ? 'Not specified' : details.cast}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-4 col-12 p-0">
              <table className={` ${styles.tableBackgroundAlternate}`}>
                <tbody>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Highest Education:</td>
                    <td
                      className={
                        subscribed ? `${styles.info}` : `${styles.blurringinfo}`
                      }
                    >
                      {!details.highest_education
                        ? 'Not specified'
                        : details.highest_education}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Employed in:</td>
                    <td className={styles.info}>
                      {!details.employed_in
                        ? 'Not specified'
                        : details.employed_in}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>Annual income:</td>
                    <td className={styles.info}>
                      {!details.annual_income
                        ? 'Not specified'
                        : details.annual_income}
                    </td>
                  </tr>
                  <tr className={styles.rows}>
                    <td className={styles.items}>About partner:</td>
                    <td
                      className={
                        subscribed ? `${styles.info}` : `${styles.blurringinfo}`
                      }
                    >
                      {!details.about_partner
                        ? 'Not specified'
                        : details.about_partner}
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

export default PartnerPreferencesLookup
