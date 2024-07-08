import React, { useEffect, useState } from 'react'
import styles from './common.module.css'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../../assets/css/custom-toastify.css'
import Swal from 'sweetalert2'
import '../../../../../assets/css/sweetalert-custom.css'

function BasicDetails() {
  const [basicdetails, setBasicdetails] = useState({})
  const [userdetais, setUserdetails] = useState({})

  const [isEditing, setIsEditing] = useState(false)
  const [editDetails, setEditedDetails] = useState({})
  const [isPhonevalid, setPhonevalid] = useState(false)
  const [isDobvalid, setDobvalid] = useState(false)

  // error notification
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

  useEffect(() => {
    const fetchBasicDetails = async () => {
      try {
        const response = await authentcatedApiClient.get(
          backendurls.userprofile,
          {
            headers: {
              details: 'basic_details',
            },
          },
        )

        if (response.data.message === 'success') {
          setBasicdetails(response.data.basic_details)
          setUserdetails(response.data.userdetails)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchBasicDetails()
  }, [isEditing])

  // handling edit button
  const handleEditButton = () => {
    setIsEditing(true)
  }

  // setting editting data into state

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedDetails({ ...editDetails, [name]: value })
    if (name === 'phone') {
      validatePhone(value)
    } else if (name === 'dob') {
      validateDob(value)
    }
  }

  // phone number validation
  const validatePhone = (value) => {
    setPhonevalid(/^\d{10}$/.test(value))
  }

  const validateDob = (dob) => {
    if (dob) {
      const inputDate = new Date(dob)
      const currentDate = new Date()
      const date18YearsAgo = new Date()
      date18YearsAgo.setFullYear(currentDate.getFullYear() - 18)
      const date50YearsAgo = new Date()
      date50YearsAgo.setFullYear(currentDate.getFullYear() - 50)
      const isDateValid =
        inputDate <= date18YearsAgo && inputDate >= date50YearsAgo
      setDobvalid(isDateValid)
    }
  }

  // saving the data to the data base to store in the database

  const handleSave = async () => {
    if (editDetails.phone && !isPhonevalid) {
      notify('please enter valid phone number')
    } else if (editDetails.dob && !isDobvalid) {
      notify('please enter valid date of birth bride should be 18 years old')
    } else {
      const response = await authentcatedApiClient.put(
        backendurls.userprofile,
        editDetails,
        {
          headers: {
            details: 'basic_details',
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
        }).then(() => {
          // Refresh the page after the user clicks "OK" on the alert
          window.location.reload()
        })
        setIsEditing(false)
      }
    }
  }

  console.log(editDetails)

  // going back to details component
  const gobacktodetails = () => {
    setIsEditing(false)
  }
  return (
    <div className={styles.outerwrapper}>
      <h4 className={styles.heading}>Basic detais</h4>

      {isEditing ? (
        <div className={`container-fluid  ${styles.basic_details}`}>
          <ToastContainer position="top-center" />

          <div className="row">
            <div className="col-lg-4 col-12 px-5">
              <div>
                <label className={styles.label}>Phone : </label>
                <input
                  className={styles.inputfield}
                  type="number"
                  name="phone"
                  placeholder={userdetais.phone || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}>Marital status: </label>
                <select
                  className={styles.dropdown}
                  name="marital_status"
                  id=""
                  defaultChecked={
                    basicdetails.marital_status || 'Not specified'
                  }
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.marital_status || 'None'}
                  </option>
                  <option value="single">single</option>
                  <option value="married">married</option>
                  <option value="divorced">divorced</option>
                  <option value="widowed">widowed</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Date of birth: </label>
                <input
                  className={styles.inputfield}
                  type="date"
                  name="dob"
                  value={editDetails.dob || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}>Height: </label>
                <select
                  className={styles.dropdown}
                  name="height"
                  id=""
                  defaultChecked={basicdetails.height || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.height || 'None'}
                  </option>
                  <option value="0-151.999">Under 5' (Under 152 cm)</option>
                  <option value="152-160">5'0" - 5'3" (152 - 160 cm)</option>
                  <option value="161-170">5'4" - 5'7" (161 - 170 cm)</option>
                  <option value="171-180">5'8" - 5'11" (171 - 180 cm)</option>
                  <option value="181-190">6'0" - 6'3" (181 - 190 cm)</option>
                  <option value="191-200">6'4" - 6'7" (191 - 200 cm)</option>
                  <option value="201-210">6'8" - 6'11" (201 - 210 cm)</option>
                  <option value="211-">7'0" and above (Over 210 cm)</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-12 px-5">
              <div>
                <label className={styles.label}>Weight : </label>
                <select
                  className={styles.dropdown}
                  name="weight"
                  id=""
                  defaultChecked={basicdetails.weight || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.weight || 'None'}
                  </option>
                  <option value="0-49.999">Under 50 kg</option>
                  <option value="50-60">50 - 60 kg</option>
                  <option value="61-70">61 - 70 kg</option>
                  <option value="71-80">71 - 80 kg</option>
                  <option value="81-90">81 - 90 kg</option>
                  <option value="91-100">91 - 100 kg</option>
                  <option value="101-110">101 - 110 kg</option>
                  <option value="111-120">111 - 120 kg</option>
                  <option value="121-">121 kg and above</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Body type: </label>
                <select
                  className={styles.dropdown}
                  name="body_type"
                  id=""
                  defaultChecked={basicdetails.body_type || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.body_type || 'None'}
                  </option>
                  <option value="slim">Slim</option>
                  <option value="athletic">Athletic</option>
                  <option value="average">Average</option>
                  <option value="muscular">Muscular</option>
                  <option value="overweight">Overweight</option>
                  <option value="obese">Obese</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Physical status: </label>
                <select
                  className={styles.dropdown}
                  name="physical_status"
                  id=""
                  defaultChecked={
                    basicdetails.physical_status || 'Not specified'
                  }
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.physical_status || 'None'}
                  </option>
                  <option value="normal">Normal</option>
                  <option value="physically challenged">
                    Physically Challenged
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Mother toungue : </label>
                <select
                  className={styles.dropdown}
                  name="mother_toungue"
                  id=""
                  defaultChecked={
                    basicdetails.mother_toungue || 'Not specified'
                  }
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.mother_toungue || 'None'}
                  </option>
                  <option value="malayalam">malayalam</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Odia">Odia</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-12 px-5">
              <div>
                <label className={styles.label}>Drinking Habits: </label>
                <select
                  className={styles.dropdown}
                  name="drinking_habits"
                  id=""
                  defaultChecked={
                    basicdetails.drinking_habits || 'Not specified'
                  }
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.drinking_habits || 'None'}
                  </option>
                  <option value="non-drinker">Non-drinker</option>
                  <option value="social-drinker">Social drinker</option>
                  <option value="regular-drinker">Regular drinker</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Eating Habits : </label>
                <select
                  className={styles.dropdown}
                  name="eating_habits"
                  id=""
                  defaultChecked={basicdetails.eating_habits || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.eating_habits || 'None'}
                  </option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-vegetarian</option>
                  <option value="eggetarian">Eggetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Smoking Habits: </label>
                <select
                  className={styles.dropdown}
                  name="smalking_habits"
                  id=""
                  defaultChecked={
                    basicdetails.smalking_habits || 'Not specified'
                  }
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {basicdetails.smalking_habits || 'None'}
                  </option>
                  <option value="non-smoker">Non-smoker</option>
                  <option value="social-smoker">Social smoker</option>
                  <option value="regular-smoker">Regular smoker</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Hobbies: </label>
                <textarea
                  className={styles.textarea}
                  name="hobbies"
                  value={editDetails.hobbies || ''}
                  placeholder={basicdetails.hobbies || 'Not specified'}
                  onChange={handleChange}
                />
              </div>
              <div className="">
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
              <div className="col-lg-4 col-12">
                <table className={`${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Email:</td>
                      <td className={styles.info}>
                        {!userdetais.email ? 'Not specified' : userdetais.email}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Phone:</td>
                      <td className={styles.info}>
                        {!userdetais.phone ? 'Not specified' : userdetais.phone}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Marital status:</td>
                      <td className={styles.info}>
                        {!basicdetails.marital_status
                          ? 'Not specified'
                          : basicdetails.marital_status}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Date of Birth:</td>
                      <td className={styles.info}>
                        {!basicdetails.dob ? 'Not specified' : basicdetails.dob}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Hobbies:</td>
                      <td className={styles.info}>
                        {!basicdetails.hobbies
                          ? 'Not specified'
                          : basicdetails.hobbies}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 col-12">
                <table className={`${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Height:</td>
                      <td className={styles.info}>
                        {!basicdetails.height
                          ? 'Not specified'
                          : basicdetails.height}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Weight:</td>
                      <td className={styles.info}>
                        {!basicdetails.weight
                          ? 'Not specified'
                          : basicdetails.weight}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Body type:</td>
                      <td className={styles.info}>
                        {!basicdetails.body_type
                          ? 'Not specified'
                          : basicdetails.body_type}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Physical status:</td>
                      <td className={styles.info}>
                        {!basicdetails.physical_status
                          ? 'Not specified'
                          : basicdetails.physical_status}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Mother tongue:</td>
                      <td className={styles.info}>
                        {!basicdetails.mother_toungue
                          ? 'Not specified'
                          : basicdetails.mother_toungue}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 col-12">
                <table className={` ${styles.tableBackgroundAlternate}`}>
                  <tbody>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Drinking Habits:</td>
                      <td className={styles.info}>
                        {!basicdetails.drinking_habits
                          ? 'Not specified'
                          : basicdetails.drinking_habits}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Eating Habits:</td>
                      <td className={styles.info}>
                        {!basicdetails.eating_habits
                          ? 'Not specified'
                          : basicdetails.eating_habits}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Smoking Habits:</td>
                      <td className={styles.info}>
                        {!basicdetails.smalking_habits
                          ? 'Not specified'
                          : basicdetails.smalking_habits}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Link to="" className="p-3" onClick={handleEditButton}>
            <i className="fa fa-edit  text-white p-5" title="Edit">
              edit
            </i>
          </Link>
        </div>
      )}
    </div>
  )
}

export default BasicDetails
