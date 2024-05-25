import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

const Usersiderouteprotection = ({component,...rest}) => {
    
    const user = useSelector((state)=>state.auth.usertoken)
    return user  ?  <component {...rest} /> : <Navigate to="/" replace />;
}

export default Usersiderouteprotection