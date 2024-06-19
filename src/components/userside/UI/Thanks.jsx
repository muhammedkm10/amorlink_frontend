import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Thanks = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentSuccess = queryParams.get('payment_success') === 'true';
    const sessionId = queryParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!paymentSuccess || !sessionId) {
            navigate('/usernotfoundpage');
        } else {
            setLoading(false);
        }
    }, [paymentSuccess, sessionId, navigate]);

    if (loading) {
        return <div className="spinner-container">
        <ClipLoader
          size={30}
          color={'#123abc'}
          loading={loading}
        />
      </div>
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: 'auto', marginTop: '30vh', backgroundColor: '#f0f0f0' }}>
            <div style={{ fontSize: '72px', color: 'red', animation: 'pulse 1s infinite' }}>&#10004;</div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Thank You for Your Subscription!</h2>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>Your payment was successful.</p>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>We appreciate your support.</p>
            <a href="/subscriptions" style={{ textDecoration: 'none', color: 'blue', fontSize: '16px', marginTop: '20px', display: 'block' }}>Your plan details</a>
        </div>
    );
};

export default Thanks;


