// components/NotificationComponent.js
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const NotificationComponent = ({ userId }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!userId) return

    const ws = new WebSocket(
      `ws://localhost:8000/ws/notification/?user_id=${userId}`,
    )
    setSocket(ws)

    ws.onopen = () => {
      console.log('WebSocket Connected for notification')
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.notification_for === 'for_chat') {
        if (window.location.pathname.startsWith('/chat')) {
          return
        }
        // Display the notification using react-toastify
        toast.info(
          <div>
            {`${message.notification}`}
            <div
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                color: 'black',
              }}
            >
              <a href={`/chat/${userId}/${0}`}>
                <i class="fa fa-arrow-right"></i>
              </a>
            </div>
          </div>,
          {
            closeOnClick: true,
            pauseOnHover: true,
            progressBar: false,

            style: {
              background: 'linear-gradient(to right, wheat, white, wheat)',
              color: 'black',
              border: '1px solid #40183a',
              fontSize: '14px',
              padding: '10px',
              width: '300px',
              height: '150px',
              maxHeight: '150px',
            },
            icon: () => (
              <FontAwesomeIcon
                style={{
                  alignSelf: 'center',
                  top: '0',
                  right: '0',
                  position: 'relative',
                }}
              />
            ),
          },
        )
      } else if (
        message.notification_for === 'requested' ||
        message.notification_for === 'accepted'
      ) {

        toast.info(
          <div>
            {`${message.notification}`}
            <div
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                color: 'black',
              }}
            >
              <a href={`/matches`}>
                <i class="fa fa-arrow-right"></i>
              </a>
            </div>
          </div>,
          {
            closeOnClick: true,
            pauseOnHover: true,
            progressBar: false,

            style: {
              background: 'white',
              color: 'black',
              fontSize: '14px',
              padding: '10px',
              width: '300px',
              height: '150px',
              maxHeight: '150px',
              borderRadius: '0 !important',
            },
            icon: () => (
              <FontAwesomeIcon
                style={{
                  alignSelf: 'center',
                  top: '0',
                  right: '0',
                  position: 'relative',
                }}
              />
            ),
          },
        )
      }

      // Check if the current route is in the excludePaths
    }

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    ws.onclose = () => {
      console.log('WebSocket Disconnected')
    }

    return () => {
      ws.close()
    }
  }, [userId])

  return null
}

export default NotificationComponent
