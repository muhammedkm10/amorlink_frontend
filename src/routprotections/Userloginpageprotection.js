import React from 'react'
import { useSelector } from 'react-redux'
import NotFoundPage from '../components/userside/UI/Error'

const Userloginpageprotection = ({children}) => {
    const user = useSelector((state)=>state.auth.usertoken)
    console.log(user)
     
    return user === null ? children  : <NotFoundPage/>
}

export default Userloginpageprotection