import React, { useState, useEffect } from 'react'
import styles from './Userprofile.module.css'
import Homenavbar from '../../layout/Homenavbar'
import profile from '../../../../assets/images/pppp.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { authentcatedApiClient } from '../../../../api/axiosconfig'
import { backendurls } from '../../../../api/backendEndpoints'
import { CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact'
import { NavLink } from 'react-router-dom'
import BasicDetails from './Userdetailcomponents/Userbasicdetails.jsx'
import ReligionInformation from './Userdetailcomponents/ReligionInformation.jsx'
import FamilyDetails from './Userdetailcomponents/FamilyDetails.jsx'
import PartnerPreferences from './Userdetailcomponents/PartnerPreferences.jsx'
import PhotoGallary from './Userdetailcomponents/PhotoGallary.jsx'
import Location from './Userdetailcomponents/Location.jsx'
import Professionaldetails from './Userdetailcomponents/Professionaldetails.jsx'
import Swal from 'sweetalert2';
import '../../../../assets/css/sweetalert-custom.css'

function Userprofile() {
  const [userdetails, setUserdetails] = useState({})
  const [userbasicdetails, setUserbasicdetails] = useState({})
  const [usergallarydetails, setUsergallarydetails] = useState({})
  const [menuOpen, setMenuOpen] = useState(false) 
  const [showSecondSide, setShowSecondSide] = useState(false);
  const [isModalShowed,setModalShowed] =  useState(false)
  const [formData,setFormData] = useState({})
  const [selectedImage,setImage] = useState(null)


  const navigate = useNavigate()

  useEffect(() => {
    try {
      authentcatedApiClient.get(backendurls.signup).then((response) => {
        if (response.data.message === 'unauthorized') {
          navigate('/unauthorized')
        }
        if (response.data.message === 'Success') {
          setUserdetails(response.data.user)
          setUserbasicdetails(response.data.basicdetails)
          setUsergallarydetails(response.data.usergallary)
          setShowSecondSide(true);
        }
      })
    } catch (error) {
      console.log('error')
    }
  }, [isModalShowed])

  const [selectedItem, setSelection] = useState(null)
  const handSidebarItemsCick = (selected) => {
    setSelection(selected)
  }

  const handSidebarItemsClick = (selected) => {
    setSelection(selected)
    setMenuOpen(false) 
  }

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // main details editing modal

  const editMaindetails = () =>{
    setModalShowed(true)
  }

    const onClose = () =>{
      setmessage(false)
      setImage(null)
      setModalShowed(false)
      setFormData({})

    }

    // handling changes in the modal

    const handlechange = (e) =>{
      const {name ,files,value} = e.target
     
      if (name === "name" || name ==="about"){

        if (name == "name"){
          validateName(value)
        }
        setFormData({...formData,
          [name]:value
        })
      }
      if (name === "image1")
        {
          if (files && files[0]){
            const reader  = new FileReader()
            reader.onloadend = () =>{
    
              setFormData({
                ...formData,
                [name] : reader.result,
              });
    
              setImage({
                ...selectedImage,
                [name]:reader.result           
               })
            }
            reader.readAsDataURL(files[0]);
          }
        }
    }


    // validation of the name
    const [namevalid,setNamevalid] = useState(false)
    const [message,setmessage]  = useState(null)

    const validateName = (value) =>{
      const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/
      setNamevalid(nameRegex.test(value))
    }





//  handling the submit button  and saving the backend
const handlesubmit = async () =>{
        if (formData.name && !namevalid){
          setmessage("Enter a valid name")
        }
        else if (!formData.name && !formData.about && !formData.image1){
          setmessage("Add any details or press close button")

        }
        else{
          try{
            const response = await authentcatedApiClient.put(backendurls.signup,formData)
            if (response.data.message == "success"){
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
              setmessage(false)
              setImage(null)
              setModalShowed(false)
              setFormData({})
            }
          
          }
          catch(error){
            console.log(error)
          }
          }
         
}

   

  return (
    <div>
      <Homenavbar className={styles.afterbreakpoint}name={userdetails.username} />
      <div className={styles.fullbody}>
        <div className={`container-fluid  ${styles.background}`}>
          
        </div>
      
        <div className={`container ${styles.head}`}>
          <div className="row">
            <div className={`col-md-6 col-12 ${styles.firstside}`}>
              {!usergallarydetails.image1 ? (
                <img src={profile} alt="" className={styles.profile} />
              ) : (
                <img
                  src={`${import.meta.env.VITE_IMAGE}${usergallarydetails.image1}`} 
                  alt="image1"
                  className={styles.profile}
                />
              )}
            </div>


              {/* modal div */}
                { isModalShowed &&
                <div className={styles.modal}>
                <div className={styles.modal_content}>
                  <h3>Edit your details here</h3>
                  {message ? <p className='text-danger'>{message}</p>:""}
                  <input type="text" id={styles.inputfield} placeholder={userdetails.username}  name='name' className={styles.modal_input} onChange={handlechange} />
                  {selectedImage ? (<img src={selectedImage.image1}  width="200px" height="200px"alt="Selected" className={styles.selectedImage} />): ""}
                  <input type="file" id="file1" className={styles.fileinput} name="image1" onChange={handlechange}/>
                  <label htmlFor="file1" className={`${styles.customFileLabel} ${styles.modal_input}`}>Change your profile</label>
                  <textarea placeholder={userdetails.about_groom} id={styles.textarea} name="about"className={styles.modal_textarea} onChange={handlechange}></textarea>
                  <div className='p-3'>
                  <button id={styles.fileinput} className={styles.modal_close} onClick={onClose}>close</button>
                  <button id={styles.fileinput} className={styles.modal_close1} onClick={handlesubmit}>save</button>

                  </div>
                </div>
              </div>
                }


            <div className={`col-lg-6 col-12 ${showSecondSide ? `${styles.secondside} show` : styles.secondside}`}>
              <div className={styles.basic}>
                <h1 className={styles.name}>{userdetails.username}</h1>
                <h4>{userbasicdetails.age} years old</h4>
                <h4>India</h4>
              </div>

              <div className={styles.about}>
                <h3>About me</h3>
                <p>{userdetails.about_groom}</p>
                <Link className={styles.primarydetailseditbutton}>
                  <i  onClick={editMaindetails}className="fa fa-edit mt-5 text-white" title="Edit">
                    edit
                  </i>
                </Link>
              </div>
            <a href="#other details" className=' mt-5'>go to other details</a>

            </div>
          </div>


        </div>
        <div id="other details"className={styles.otherdetails}>
          <div className={styles.details}>
            <div className={styles.wrapper}>
              <button className={styles.hamburger} onClick={toggleMenu}>
                <i className="fa fa-bars"></i>
              </button>
              <CDBSidebarMenu
                className={`${menuOpen ? styles.topnav : styles.show}`}
              >
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('basic')}
                    icon=""
                  >
                    Basic details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('religion')}
                    icon=""
                  >
                    Religional information
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('location')}
                    icon=""
                  >
                    Location Details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('family')}
                    icon=""
                  >
                    Family details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('preference')}
                    icon=""
                  >
                    Your preferences
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('profession')}
                    icon=""
                  >
                    Your professional details
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  className={styles.links}
                >
                  <CDBSidebarMenuItem
                    onClick={() => handSidebarItemsCick('gallary')}
                    icon=""
                  >
                    Your gallery
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </div>
          </div>

          <div  className={`container${styles.showdetails}`}>
            {selectedItem === 'basic' || selectedItem === null ? (
              <BasicDetails  />
            ) : null}
            {selectedItem === 'religion' && <ReligionInformation />}
            {selectedItem === 'location' && <Location />}
            {selectedItem === 'family' && <FamilyDetails />}
            {selectedItem === 'preference' && <PartnerPreferences />}
            {selectedItem === 'gallary' && <PhotoGallary />}
            {selectedItem === 'profession' && <Professionaldetails />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userprofile
