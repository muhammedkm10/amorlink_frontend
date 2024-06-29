import React, { useEffect, useState } from 'react'
import styles from './sidebar.module.css'
import image from '../../../../../assets/images/pppp.jpg'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import { Link } from 'react-router-dom'

function Sidebar() {
  const [matches,setMatches] = useState([])
  const [loading,setLoading]= useState(false)
 

  // fetching the current user matches
  const fetchData = async () =>{
    try{
      const response = await authentcatedApiClient.get(backendurls.matchrequests,{
        headers:{
          'details':"matched"
        }
      })
      if (response.data.message === "success"){
        setLoading(false)

        setMatches(response.data.users)
}
      
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className={styles.sidebar}>

    <div className={styles.head}>
      <div className={styles.mainHeading}>
        <div className={styles.header1}>
      <h5 className={styles.match}>Matches</h5>
      </div>
      </div>

        <div className={styles.searchcontainer}>
      <input  className={styles.search} type="text" placeholder='search' />

      </div>
    
        </div>
    <div className={styles.sidebarusers}>
        {
          matches.map((element)=>(
            <Link className={styles.linktochat} to={`/chat/${element.id}/${element.name}`}><div className={styles.user}> {!element.image_details ? <img className={styles.profilePhoto}  src={image} width="50px" height="50px" alt="" /> : <img src={`${import.meta.env.VITE_IMAGE}${element.image_details}`} className={styles.profilePhoto}alt="" width="40px" height="40px"/> }<span className={styles.username}>{element.name}</span></div></Link>
          ))
        }
      
        

    </div>
    </div>

  )
}

export default Sidebar