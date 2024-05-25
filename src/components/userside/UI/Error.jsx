import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../../assets/images/pagenotfound.jpeg' // Adjust the path to your image

function NotFoundPage() {
 return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <img src={PageNotFound} alt="Page Not Found" style={{ width: '300px', height: '300px' }} />
      <h1 style={{ fontSize: '2em', color: '#333' }}>Oops! Page not found.</h1>
      <p style={{ fontSize: '1.2em', color: '#666' }}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Go back to Home</Link>
    </div>
 );
}

export default NotFoundPage;
