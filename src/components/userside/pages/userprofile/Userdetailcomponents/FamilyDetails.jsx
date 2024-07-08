import React, { useEffect, useState } from 'react'
import styles from './common.module.css'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import '../../../../../assets/css/sweetalert-custom.css'
import '../../../../../assets/css/custom-toastify.css'

function FamilyDetails() {
  const [details, setDetails] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editDetails, setEditedDetails] = useState({})

  // notification

  const notify = (data) =>
    toast.error(
      <div>
        <i className="fas  "></i>
        {data}
      </div>,
      {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        progressClassName: 'custom-toast-progress',
      },
    )

  // fetching the data from the backend to show in the family details section
  const fetchFamilyDetails = async () => {
    try {
      const response = await authentcatedApiClient.get(
        backendurls.userprofile,
        {
          headers: {
            details: 'family_details',
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

  useEffect(() => {
    fetchFamilyDetails()
  }, [isEditing])

  // edit details handle function

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
    if (
      editDetails.no_of_brothers &&
      (editDetails.no_of_brothers > 10 || editDetails.no_of_brothers < 0)
    ) {
      notify('enter  valid no of brothers')
    } else if (
      editDetails.no_of_brothers_married &&
      (editDetails.no_of_brothers_married > 10 ||
        editDetails.no_of_brothers_married < 0)
    ) {
      notify('enter  valid no of married brothers')
    } else if (
      editDetails.no_of_sisters &&
      (editDetails.no_of_sisters > 10 || editDetails.no_of_sisters < 0)
    ) {
      notify('enter  valid no of  sisters')
    } else if (
      editDetails.no_of_sisters_married &&
      (editDetails.no_of_sisters_married > 10 ||
        editDetails.no_of_sisters_married < 0)
    ) {
      notify('enter  valid no of married sister')
    } else {
      const response = await authentcatedApiClient.put(
        backendurls.userprofile,
        editDetails,
        {
          headers: {
            details: 'family_details',
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
  }
  // going back to details component
  const gobacktodetails = () => {
    setIsEditing(false)
  }

  return (
    <div className={`${styles.outerwrapper}`}>
      <div className={styles.headers}>
        <h4 className={styles.heading}>Family Details</h4>
      </div>
      {isEditing ? (
        <div className={`container-fluid  ${styles.basic_details}`}>
          <ToastContainer position="top-center" />

          <div className="row">
            <div className="col-lg-4 col-12 px-5">
              <div className={styles.dropdownwrap}>
                <label className={styles.label}>Family status: </label>
                <select
                  className={styles.dropdown}
                  name="family_status"
                  id=""
                  defaultChecked={editDetails.family_status || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.family_status}
                  </option>
                  <option value="upper middle">Upper middle</option>
                  <option value="high class">High class</option>
                  <option value="rich/affluent">Rich/affluent</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className={styles.label}>Family value: </label>
                <select
                  className={styles.dropdown}
                  name="family_value"
                  id=""
                  defaultChecked={details.family_value || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.family_value || 'None'}
                  </option>
                  <option value="Orthodox">Orthodox</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Modern">Modern</option>
                  <option value="liberal">liberal</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className={styles.label}>Family type: </label>
                <select
                  className={styles.dropdown}
                  name="family_type"
                  id=""
                  defaultChecked={details.family_type || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.family_type || 'None'}
                  </option>
                  <option value="Joint family">Joint family</option>
                  <option value="Nuclear family">Nuclear family</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Family location: </label>
                <select
                  className={styles.dropdown}
                  name="family_location"
                  id=""
                  defaultChecked={details.family_location || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.family_location || 'None'}
                  </option>
                  <option value="Same as my location">
                    Same as my location
                  </option>
                  <option value="Another location">Another location</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-12 px-5">
              <div>
                <label className={styles.label}>No brothers: </label>
                <input
                  className={styles.inputfield}
                  type="number"
                  name="no_of_brothers"
                  value={editDetails.no_of_brothers || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}>No of married brothers: </label>
                <input
                  className={styles.inputfield}
                  type="number"
                  name="no_of_brothers_married"
                  value={editDetails.no_of_brothers_married || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}>No of sisters: </label>
                <input
                  className={styles.inputfield}
                  type="number"
                  name="no_of_sisters"
                  value={editDetails.no_of_sisters || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className={styles.label}>No of sisters married: </label>
                <input
                  className={styles.inputfield}
                  type="number"
                  name="no_of_sisters_married"
                  value={editDetails.no_of_sisters_married || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-12 px-5">
              <div>
                <label className={styles.label}>Father Occupation: </label>
                <select
                  className={styles.dropdown}
                  name="father_occupation"
                  id=""
                  defaultChecked={details.father_occupation || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.father_occupation || 'None'}
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
                <label className={styles.label}>Mother Occupation: </label>
                <select
                  className={styles.dropdown}
                  name="mother_occupation"
                  id=""
                  defaultChecked={details.mother_occupation || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.mother_occupation || 'None'}
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
                <label className={styles.label}>About my family: </label>
                <textarea
                  className={styles.textarea}
                  name="about_family"
                  value={editDetails.about_family || ''}
                  placeholder={details.about_family || 'Not specified'}
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
          <Link className="pt-5" onClick={handleEditButton}>
            <i className="fa fa-edit  text-white pt-5" title="Edit">
              edit
            </i>
          </Link>
        </div>
      )}
    </div>
  )
}

export default FamilyDetails
