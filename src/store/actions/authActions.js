import apiClient from "../../api/axiosconfig"
import axios from "axios"
import { useSelector } from "react-redux"

export const login = (credentials) => async (dispatch)  =>{
    try{
          const response = await apiClient.post('/authapp/userlogin',credentials)
          if (response.status === 200){
            const resp = response.data
            axios.post('http://127.0.0.1:8000/authapp/api/token',  credentials)
              .then((response)=>{
                console.log(response.data)
                const p = response.data
                if (resp.role === "user"){
                       localStorage.setItem("authUserTokens", JSON.stringify(p))
                       localStorage.setItem("role","user")
                       dispatch({type:"LOGIN SUCCESS",payload:{usertoken:p,admintoken:null,role:resp.role}})
                       
                }
                else if (resp.role === "admin"){
                  localStorage.setItem('authAdminToken',JSON.stringify(p))
                  localStorage.setItem("role","admin")

                }
              })
          }
         

    }

    catch(error){
      if (error.response && error.response.data.error === "notpresent") {
        return "notpossible"
    }
    else if(error.response.data.error === "notverified"){
      return "notverified"

    }
    }
}