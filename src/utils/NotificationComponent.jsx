// components/NotificationComponent.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const NotificationComponent = ({ userId}) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/notification/?user_id=${userId}`);
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("point of view in the app.js", message);

      // Check if the current route is in the excludePaths
      if (window.location.pathname.startsWith('/chat')) {
        return;
      }
  
      // Display the notification using react-toastify
      toast.info(`${message.notification}`, {
        closeOnClick: true,
        pauseOnHover: true,
        style: {
            background: "linear-gradient(to right ,#771a42 ,#c0105c,#771a42 )",
            color: 'white',
            border:"1px solid #40183a",
            borderRadius:"10px",
            fontSize: '14px',
            padding: '10px',
            width:"300px",
            height:"150px",
            maxHeight:"150px",
         

          },
          icon: () => (
            <FontAwesomeIcon icon={""} style={{ alignSelf: 'center',top:"0" ,right:"0",position:"relative"}}/>
          ),
          
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  return null;
};

export default NotificationComponent;
