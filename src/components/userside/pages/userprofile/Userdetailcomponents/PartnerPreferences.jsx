import React, { useEffect, useState } from 'react'
import styles from './common.module.css'
import { backendurls } from '../../../../../api/backendEndpoints'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../../assets/css/custom-toastify.css'

import Swal from 'sweetalert2'
import '../../../../../assets/css/sweetalert-custom.css'

function PartnerPreferences() {
  const [details, setDetails] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editDetails, setEditedDetails] = useState({})

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
    const fetchPartnerPreference = async () => {
      try {
        const response = await authentcatedApiClient.get(
          backendurls.userprofile,
          {
            headers: {
              details: 'partner_preferences', // Replace with your actual header and value
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
    if (
      editDetails.patner_age &&
      (editDetails.patner_age > 60 || editDetails.patner_age < 18)
    ) {
      notify('enter  valid  age between 18 and 60')
    } else {
      const response = await authentcatedApiClient.put(
        backendurls.userprofile,
        editDetails,
        {
          headers: {
            details: 'partner_preferences',
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
    <div className={styles.outerwrapper}>
      <h4 className={styles.heading}>Partner Preferences</h4>

      {isEditing ? (
        <div className={`container-fluid  ${styles.basic_details}`}>
          <ToastContainer position="top-center" />

          <div className="row">
            <div className="col-lg-4 col-12 px-5">
              <div>
                <label className={styles.label}>Age: </label>
                <input
                  className={styles.inputfield}
                  type="number"
                  name="patner_age"
                  value={editDetails.patner_age || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={styles.label}>Height: </label>
                <select
                  className={styles.dropdown}
                  name="height"
                  id=""
                  defaultChecked={details.height || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.height || 'None'}
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
              <div>
                <label className={styles.label}>Marital status: </label>
                <select
                  className={styles.dropdown}
                  name="marital_status"
                  id=""
                  defaultChecked={details.marital_status || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.marital_status || 'None'}
                  </option>
                  <option value="single">single</option>
                  <option value="married">married</option>
                  <option value="divorced">divorced</option>
                  <option value="widowed">widowed</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Mother toungue: </label>
                <select
                  className={styles.dropdown}
                  name="mother_toungue"
                  id=""
                  defaultChecked={details.mother_toungue || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.mother_toungue || 'None'}
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
              <div>
                <label className={styles.label}>Eating habits: </label>
                <select
                  className={styles.dropdown}
                  name="eating_habits"
                  id=""
                  defaultChecked={details.eating_habits || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.eating_habits || 'None'}
                  </option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-vegetarian</option>
                  <option value="eggetarian">Eggetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>

            <div className="col-lg-4 col-12 px-5">
              <div>
                <label className={styles.label}>Physical status: </label>
                <select
                  className={styles.dropdown}
                  name="physical_status"
                  id=""
                  defaultChecked={details.physical_status || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.physical_status || 'None'}
                  </option>
                  <option value="normal">Normal</option>
                  <option value="physically challenged">
                    Physically Challenged
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={styles.label}>Drinking habits: </label>
                <select
                  className={styles.dropdown}
                  name="drinking_habits"
                  id=""
                  defaultChecked={details.drinking_habits || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.drinking_habits || 'None'}
                  </option>
                  <option value="non-drinker">Non-drinker</option>
                  <option value="social-drinker">Social drinker</option>
                  <option value="regular-drinker">Regular drinker</option>
                </select>
              </div>

              <div>
                <label className={styles.label}>Smoking habits: </label>
                <select
                  className={styles.dropdown}
                  name="smalking_habits"
                  id=""
                  defaultChecked={details.smalking_habits || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.smalking_habits || 'None'}
                  </option>
                  <option value="non-smoker">Non-smoker</option>
                  <option value="social-smoker">Social smoker</option>
                  <option value="regular-smoker">Regular smoker</option>
                </select>
              </div>

              <div>
                <label className={styles.label}>Religion: </label>
                <select
                  className={styles.dropdown}
                  name="religion"
                  id=""
                  defaultChecked={details.religion || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.religion || 'None'}
                  </option>
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
                  <option value="Other Indigenous Religions">
                    Other Indigenous Religions
                  </option>
                  <option value="Atheism">Atheism</option>
                  <option value="Agnosticism">Agnosticism</option>
                  <option value="Irreligion">Irreligion</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-12 px-5">
              <div>
                <label className={styles.label}>Cast : </label>
                <select
                  className={styles.dropdown}
                  name="cast"
                  id=""
                  defaultChecked={details.cast || 'Not specified'}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    {details.cast || 'None'}
                  </option>
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
                <label className={styles.label}>Employed In: </label>
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
                <label className={styles.label}>Annual income: </label>
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
                <label className={styles.label}>About my partner: </label>
                <textarea
                  className={styles.textarea}
                  name="about_partner"
                  onChange={handleChange}
                  value={editDetails.about_partner || ''}
                ></textarea>
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
                      <td className={styles.info}>
                        {!details.mother_toungue
                          ? 'Not specified'
                          : details.mother_toungue}
                      </td>
                    </tr>
                    <tr className={styles.rows}>
                      <td className={styles.items}>Eating Habits:</td>
                      <td className={styles.info}>
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
                      <td className={styles.info}>
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
                      <td className={styles.info}>
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
                      <td className={styles.info}>
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

export default PartnerPreferences
