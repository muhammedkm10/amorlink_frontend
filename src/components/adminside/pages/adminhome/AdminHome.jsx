import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import './AdminHome.module.css'
import { admin_authentcatedApiClient } from '../../../../api/axiosconfig'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
    const state = useSelector(state=>state.auth.admintoken)
    const navigate = useNavigate()
    useEffect(()=>{
      try{
             admin_authentcatedApiClient.get('/authapp/usersignup')
             .then((response)=>{
              if (response.data.message === "unauthorized"){
                console.log(response.data.message)
                navigate("/unauthorized")
              }
              if (response.data.message === "Success"){
                console.log("i got the user")
              }
            })

            }
        catch(error){
              console.log("erroorrrrr")
        }
    },[])

  return (
    <div>AdminHome</div>
  )
}

export default AdminHome