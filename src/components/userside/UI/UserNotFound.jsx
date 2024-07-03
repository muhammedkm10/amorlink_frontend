import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../../assets/images/pagenotfound.jpeg' // Adjust the path to your image
import Homenavbar from '../layout/Homenavbar';
import RegistrationFooter from '../layout/regfooter';

function NotFoundPageforUser() {
 return (
  <>
  <Homenavbar page="home" />
    <div style={{ textAlign: 'center', padding: '50px', height:"83vh" ,background:"radial-gradient(#40183a 80%, transparent 20%) 0 0, radial-gradient(#40183a 20%, transparent 90%) 10px 10px",backgroundSize: "20px 20px"}}>
      <h1 style={{ fontSize: '30vh', color: 'white' }} className='text-decoration-line-through'>404</h1>
      <h1 style={{ fontSize: '2em', color: 'white' }}>Oops! Page not found.</h1>
      <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>Go back to home</Link>
    </div>
    <div style={{bottom:"0" ,right:"0"}}>
    <RegistrationFooter/>
    </div>
    </>
 );
}

export default NotFoundPageforUser;

