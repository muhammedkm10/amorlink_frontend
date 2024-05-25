import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

const Usersiderouteprotection = ({component,...rest}) => {
    const user = localStorage.getItem('authUserTokens')
    console.log(user)
    return user  ?  <component {...rest} /> : <Navigate to="/" replace />;
}

export default Usersiderouteprotection