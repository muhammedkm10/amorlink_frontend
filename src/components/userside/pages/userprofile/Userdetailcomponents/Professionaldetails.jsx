import React, { useEffect, useState } from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../../../../../assets/css/sweetalert-custom.css'

function Professionaldetails() {
  const [details, setDetails] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editDetails, setEditedDetails] = useState({})

  useEffect(() => {
    const fetchProfessiionaldetails = async () => {
      try {
        const response = await authentcatedApiClient.get(
          backendurls.userprofile,
          {
            headers: {
              details: 'profesional_details', // Replace with your actual header and value
            },
          },
        )

        if (response.data.message === 'success') {
          setDetails(response.data.profesional_details)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchProfessiionaldetails()
  }, [isEditing])

  // handling edit button
  const handleEditButton = () => {
    setEditedDetails(details)
    setIsEditing(true)
  }

  // setting editting data into state

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedDetails({ ...editDetails, [name]: value })
  }

  // saving the data to the data base to store in the database

  const handleSave = async () => {
    const response = await authentcatedApiClient.put(
      backendurls.userprofile,
      editDetails,
      {
        headers: {
          details: 'profesional_details',
        },
      },
    )
    if (response.data.message == 'success') {
      Swal.fire({
        title: 'Edited successfully',
        icon: 'success',
        customClass: {
          popup: 'swal-custom-container',
          title: 'swal-custom-title',
          icon: 'swal-custom-icon',
          confirmButton: 'swal-custom-confirm-button',
          cancelButton: 'swal-custom-cancel-button',
          actions: 'swal-custom-buttons-container',
          backdrop: `
              black
              center left
              no-repeat
            `,
        },
      })
      setIsEditing(false)
    }
  }

  // going back to details component
  const gobacktodetails = () => {
    setIsEditing(false)
  }

  return (
    <div className={styles.outerwrapper}>
      <h4 className={styles.heading}>profession</h4>

      {isEditing ? (
        <div className={`container-fluid  ${styles.basic_details}`}>
          <div className="row">
            <div className="col-lg-6 col-12 px-5">
              <div>
                <label className={styles.label}>Employed in: </label>
                <select
                  className={styles.dropdown}
                  name="employed_in"
                  id=""
                  defaultChecked={details.employed_in || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.employed_in || 'None'}
                  </option>
                  <option value="Government / PSU">Government / PSU</option>
                  <option value="Private">Private</option>
                  <option value="Business">Business</option>
                  <option value="Defence">Defence</option>
                  <option value="Self employed">Self employed</option>
                  <option value="Not working">Not working</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Annual income </label>
                <select
                  className={styles.dropdown}
                  name="annual_income"
                  id=""
                  defaultChecked={details.annual_income || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.annual_income || 'None'}
                  </option>
                  <option value="0-50000">Under ₹50,000</option>
                  <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                  <option value="100001-150000">₹1,00,001 - ₹1,50,000</option>
                  <option value="150001-200000">₹1,50,001 - ₹2,00,000</option>
                  <option value="200000-">₹2,00,000 above</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Highest education: </label>
                <select
                  className={styles.dropdown}
                  name="highest_education"
                  id=""
                  defaultChecked={details.highest_education || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.highest_education || 'None'}
                  </option>
                  <option value="No formal education">
                    No formal education
                  </option>
                  <option value="Primary education">Primary education</option>
                  <option value="Secondary education">
                    Secondary education
                  </option>
                  <option value="Senior secondary (10+2)">
                    Senior secondary (10+2)
                  </option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's degree">Bachelor's degree</option>
                  <option value="Master's degree">Master's degree</option>
                  <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                  <option value="Postdoctoral research">
                    Postdoctoral research
                  </option>
                  <option value="Professional qualification">
                    Professional qualification (CA, CS, CFA, etc.)
                  </option>
                  <option value="Technical certification">
                    Technical certification (IT, Engineering, etc.)
                  </option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Education in detail : </label>
                <textarea
                  className={styles.textarea}
                  name="education_in_details"
                  placeholder={details.education_in_details || 'Not specified'}
                  value={editDetails.education_in_details || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-12 px-5">
              <div>
                <label className={styles.label}>College: </label>
                <input
                  className={styles.inputfield}
                  type="text"
                  name="college"
                  placeholder={details.college || 'Not specified'}
                  value={editDetails.college || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className={styles.label}>Occupation: </label>
                <select
                  className={styles.dropdown}
                  name="occupation"
                  id=""
                  defaultChecked={details.occupation || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.occupation || 'None'}
                  </option>
                  <option value="Accountant">Accountant</option>
                  <option value="Actor">Actor</option>
                  <option value="Architect">Architect</option>
                  <option value="Artist">Artist</option>
                  <option value="Banker">Banker</option>
                  <option value="Businessman">Businessman</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Chef">Chef</option>
                  <option value="Civil Servant">Civil Servant</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Driver">Driver</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Fashion Designer">Fashion Designer</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Hairdresser">Hairdresser</option>
                  <option value="Journalist">Journalist</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Pilot">Pilot</option>
                  <option value="Police Officer">Police Officer</option>
                  <option value="Professor">Professor</option>
                  <option value="Salesperson">Salesperson</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Technician">Technician</option>
                  <option value="Waiter">Waiter</option>
                  <option value="Writer">Writer</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Organization: </label>
                <input
                  className={styles.inputfield}
                  type="text"
                  name="organization"
                  placeholder={details.organization || 'Not specified'}
                  value={editDetails.organization || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button className={styles.savebutton} onClick={handleSave}>
                  Save
                </button>
                <button className={styles.savebutton} onClick={gobacktodetails}>
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={`container ${styles.basic_details}`}>
            <div className="row">
              <div className="col-lg-6 col-12 px-5">
                <table className={`${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Employed in:</td>
                      <td className={styles.info}>
                        {!details.employed_in
                          ? 'Not specified'
                          : details.employed_in}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Annual Income:</td>
                      <td className={styles.info}>
                        {!details.annual_income
                          ? 'Not specified'
                          : details.annual_income}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Education:</td>
                      <td className={styles.info}>
                        {!details.highest_education
                          ? 'Not specified'
                          : details.highest_education}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Education in detail:</td>
                      <td className={styles.info}>
                        {!details.education_in_details
                          ? 'Not specified'
                          : details.education_in_details}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-6 col-12 px-5">
                <table className={` ${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>College:</td>
                      <td className={styles.info}>
                        {!details.college ? 'Not specified' : details.college}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Occupation:</td>
                      <td className={styles.info}>
                        {!details.occupation
                          ? 'Not specified'
                          : details.occupation}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Organization:</td>
                      <td className={styles.info}>
                        {!details.organization
                          ? 'Not specified'
                          : details.organization}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Link to="" className="m-3" onClick={handleEditButton}>
            <i className="fa fa-edit  text-white p-5" title="Edit">
              edit
            </i>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Professionaldetails
