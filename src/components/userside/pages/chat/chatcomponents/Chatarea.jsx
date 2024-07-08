import React, { useEffect, useRef, useState } from 'react'
import Messages from './Messages'
import styles from './chatarea.module.css'
import MessageInput from './MessageInput'
import { authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import image1 from '../../../../../assets/images/pppp.jpg'
import noimage from '../../../../../assets/images/nomessage.png'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

function Chatarea({ userId, receiverId }) {
  // const receiverId = userId;
  const [userid, setUserid] = useState(receiverId)
  const [prevMessages, setPrevMessages] = useState([])
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const [image, setImage] = useState(null)
  const [username, setUsername] = useState(null)

  const messageEndRef = useRef(null) // Reference for the end of messages
  const [isconnected, setConnected] = useState(false)
  const navigate = useNavigate()

  // fetching messages
  const fetchMessages = async () => {
    try {
      const response = await authentcatedApiClient.get(
        `${backendurls.personalchaturl}/${userId}/${receiverId}`,
      )
      if (response.data.message === 'from navbar') {
        setUserid(0)
        setImage(null)
      }
      if (response.data.message === 'no users') {
        navigate('/usernotfoundpage')
      }

      if (response.data.message === 'no_subscription') {
        navigate('/usernotfoundpage')
      } else if (response.data.message === 'no_matched_each_other') {
        navigate('/usernotfoundpage')
      } else if (response.data.message === 'no_messages') {
        setImage(response.data)
      } else if (response.data.message === 'success') {
        setUserid(receiverId)

        setPrevMessages(response.data.messages)
        setImage(response.data.image)
        setUsername(response.data.username)
      }
    } catch (error) {
      console.log('our error', error)
    }
  }
  // function to scroll bottom
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // for scroll down while message loading and the new message sending or coming
  useEffect(() => {
    scrollToBottom()
  }, [prevMessages, isconnected])

  // useeffect for connecting the socket while mouting the component
  useEffect(() => {
    fetchMessages()

    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat/?receiver_id=${receiverId}&user_id=${userId}`,
    )
    setSocket(ws)
    ws.onopen = () => {
      console.log('WebSocket Connected for chat')
      setConnected(true)
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      3
      setPrevMessages((prevMessages) => [...prevMessages, message])
    }

    ws.onerror = (error) => {
      console.log(error)
    }

    ws.onclose = () => {
      setPrevMessages([])
      console.log('WebSocket Disconnected in the chat area')
      setConnected(false)
    }

    return () => {
      ws.close()
    }
  }, [receiverId])

  // function api send the notification from the backend

  const sendNotification = async (receiverId) => {
    try {
      const response = authentcatedApiClient.post(
        `${backendurls.notification}/${userId}/${receiverId}`,
        {
          headers: {
            details: message,
          },
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  // send message function to send the message to the backend
  const sendMessage = (text) => {
    if (text.length === 0) {
      console.log('no messages')
    } else {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'send',
            content: text,
            receiver: receiverId,
            sender: userId,
          }),
        )
        sendNotification(receiverId) //calling the function to send the notification
      }
      setMessage('')
    }
  }

  return (
    <>
      {/* page when it mounting */}
      {userid === 0 ? (
        <div className={styles.chatarea}>
          <div className={`container ${styles.nomessage}`}>
            <img src={noimage} alt="No messages" />
            <h5 className={styles.nomessageheading}>
              Chat with someone from your matches
            </h5>
          </div>
        </div>
      ) : // this part only showing if the socket is connected
      !isconnected ? (
        <div className="continer-fluid d-flex justify-content-center">
          <div className="spinner-container">
            <ClipLoader size={20} color={'#123abc'} loading={'loading'} />
          </div>
        </div>
      ) : (
        <div className={styles.chatarea}>
          <div className={styles.chatheader}>
            {image ? (
              <Link
                to={`/shoeprofiles`}
                state={{ comingfrom: 'matched_page', userid: receiverId }}
              >
                <img
                  className={styles.profilePhoto}
                  src={`${import.meta.env.VITE_IMAGE}${image}`}
                  width="40px"
                  height="40px"
                  alt="Profile"
                />
              </Link>
            ) : (
              <Link
                to={`/shoeprofiles`}
                state={{ comingfrom: 'matched_page', userid: receiverId }}
              >
                <img
                  className={styles.profilePhoto}
                  src={image1}
                  width="50px"
                  height="50px"
                  alt="Profile"
                />
              </Link>
            )}
            <h5 className={styles.username}>{username}</h5>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.messagepart}>
              {prevMessages.length !== 0 &&
                prevMessages.map((msg, index) => (
                  <Messages
                    key={index}
                    send={
                      parseInt(msg.sender) === parseInt(receiverId)
                        ? 'receive'
                        : 'send'
                    }
                    text={msg.content}
                    time={msg.timestamp}
                  />
                ))}
              <div ref={messageEndRef} /> {/* The end of the message list */}
            </div>

            <div className={styles.sendpart}>
              <MessageInput
                onChange={setMessage}
                message={message}
                onSend={sendMessage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatarea
