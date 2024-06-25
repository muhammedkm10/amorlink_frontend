import React, { useEffect, useRef, useState } from 'react';
import Messages from './Messages';
import styles from './chatarea.module.css';
import MessageInput from './MessageInput';
import { authentcatedApiClient } from '../../../../../api/axiosconfig';
import { backendurls } from '../../../../../api/backendEndpoints';
import image1 from '../../../../../assets/images/pppp.jpg'
import noimage from '../../../../../assets/images/nomessage.png'
import { Link } from 'react-router-dom';


function Chatarea({ userId ,username}) {
  const user_id = localStorage.getItem('user_id'); // Ensure this is set correctly
  const receiverId = userId;
  const [prevMessages, setPrevMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [image,setImage] = useState(null)
  const messageEndRef = useRef(null); // Reference for the end of messages


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

    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };


    useEffect(() => {
      scrollToBottom(); // Call scrollToBottom when prevMessages changes
    }, [prevMessages]);


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
      setPrevMessages([])
      console.log('WebSocket Disconnected');
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  const sendMessage = (text) => {
    if (text.length === 0){
      console.log("sdljfaosdjf");
    }
    else{
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'send', content: text, receiver: receiverId ,sender:user_id}));
      }
      setMessage("")
    }
    
    
  };
console.log('without fetching ',prevMessages.length);

  return (
<>
    {
       prevMessages.length === 0  ?(
        <div className={styles.chatarea}>
              <div className={`container ${styles.nomessage}`}>
                  <img src={noimage} alt="" />
              <h5 className={styles.nomessageheading}>chat with some one from your matches</h5>

              </div>
        </div>
       ):(
        <div className={styles.chatarea}>
      <div className={styles.chatheader}>
      { image  ? ( <Link to={`/shoeprofiles/${receiverId}`} state={{ comingfrom: "matched_page" }}><img className={styles.profilePhoto}  src={`${import.meta.env.VITE_IMAGE}${image}`} width="40px"  height="40px"></img></Link>) :( <Link to={`/shoeprofiles/${receiverId}`} state={{ comingfrom: "matched_page" }}><img className={styles.profilePhoto}  src={image1} width="50px" height="50px" alt="" /></Link>)}
        <h5 className={styles.usename}>{username}</h5>
      </div>

      <div className={styles.wrapper}>
      <div className={styles.messagepart}>
        {prevMessages.map((msg, index) => (
          <Messages key={index} send={parseInt(msg.sender) === parseInt(userId) ? "recieve" : "send"} text={msg.content} time={msg.timestamp
          } />
        ))}
      <div ref={messageEndRef} /> {/* The end of the message list */}
       
      </div>
      <div className={styles.sendpart}>
        <MessageInput onChange={setMessage} message={message} onSend={sendMessage} />
      </div>
    </div>
    </div>
       )
    }
    </>
    
  );
}

export default Chatarea;
