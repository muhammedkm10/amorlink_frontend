import React, { useEffect, useState } from 'react';
import Messages from './Messages';
import styles from './chatarea.module.css';
import MessageInput from './MessageInput';
import { authentcatedApiClient } from '../../../../../api/axiosconfig';
import { backendurls } from '../../../../../api/backendEndpoints';
import image1 from '../../../../../assets/images/pppp.jpg'


function Chatarea({ userId ,username}) {
  const user_id = localStorage.getItem('user_id'); // Ensure this is set correctly
  const receiverId = userId;
  const [prevMessages, setPrevMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [image,setImage] = useState(null)
  const fetchMessages  = async () =>{
        try{
          const response  = await authentcatedApiClient.get(`${backendurls.personalchaturl}/${user_id}/${receiverId}`)
          if (response.data.message === "success"){
            console.log("message retriving front backend",response.data.messages);
                setPrevMessages(response.data.messages)
                setImage(response.data.image)
          }
          
        }
        catch(error){
          console.log(error);
        }
            
  }
    console.log(prevMessages);
  useEffect(() => {

    fetchMessages()
     
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/?receiver_id=${receiverId}&user_id=${user_id}`);
    setSocket(ws)
    ws.onopen = () => {
      // console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      // console.log(event);
      const message = JSON.parse(event.data);

      console.log("message now i send",message);
      setPrevMessages((prevMessages) => [...prevMessages, message]);
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
  console.log("image of the user",image);

  const sendMessage = (text) => {
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'send', content: text, receiver: receiverId ,sender:user_id}));
    }
    setMessage("")
  };
console.log('without fetching ',prevMessages.length);

  return (
<>
    {
       prevMessages.length === 0  ?(
        <div className={styles.chatarea}>
             <div></div>
        </div>
       ):(
        <div className={styles.chatarea}>
      <div className={styles.chatheader}>
        { image  ? (<img className={styles.profilePhoto}  src={`${import.meta.env.VITE_IMAGE}${image}`} width="40px"  height="40px"></img>) :(<img className={styles.profilePhoto}  src={image1} width="50px" height="50px" alt="" />)}
        <h5 className={styles.usename}>{username}</h5>
      </div>
      <div className={styles.messagepart}>
        {prevMessages.map((msg, index) => (
          <Messages key={index} send={parseInt(msg.sender) === parseInt(userId) ? "recieve" : "send"} text={msg.content} />
        ))}
      </div>
      <div className={styles.sendpart}>
        <MessageInput onChange={setMessage} message={message} onSend={sendMessage} />
      </div>
    </div>
       )
    }
    </>
    
  );
}

export default Chatarea;
