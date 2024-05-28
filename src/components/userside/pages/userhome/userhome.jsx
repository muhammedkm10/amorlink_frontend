import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Homenavbar from '../../layout/Homenavbar'
import  { authentcatedApiClient } from '../../../../api/axiosconfig'
import { useNavigate } from 'react-router-dom'
import styles from './Userhome.module.css'
import { backendurls } from '../../../../api/backendEndpoints'


function Userhome() {

    const [user,setUser] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    
    useEffect(()=>{
      try{
             authentcatedApiClient.get(backendurls.signup)
             .then((response)=>{
              if (response.data.message === "unauthorized"){
                console.log(response.data.message)
                navigate("/unauthorized")
              }
              if (response.data.message === "Success"){
                setUser(response.data.user)
                dispatch({type:"userdetails",payload:response.data.user})


              }
            })
            }
        catch(error){
              console.log("erroorrrrr")
        }
    },[])
  return (
    <div className={styles.fullbody} >
        <Homenavbar name={user.username}/>
         <div></div>
    </div>
  )
}

export default Userhome