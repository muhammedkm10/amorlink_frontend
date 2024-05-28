import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './AdminHome.module.css'
import { admin_authentcatedApiClient } from '../../../../api/axiosconfig'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
    const state = useSelector(state=>state.auth.admintoken)
    const dispatch = useDispatch()
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
    const  logout = () =>{
      dispatch({type:"LOGIN FAILURE"})
      localStorage.removeItem("authAdminTokens");
      localStorage.removeItem("role");
      navigate('/admin/adminlogin')

 }

  return (
    <>    
        <div>AdminHome</div>
        <button onClick={logout}>logout</button>
    </>
    
  )
}

export default AdminHome