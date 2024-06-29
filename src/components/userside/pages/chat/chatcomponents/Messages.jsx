import React from 'react'
import styles from './messages.module.css'

function Messages({send,text,time}) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp); 
    const hours = date.getHours(); 
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    // format hours, minutes, and seconds to ensure they have two digits
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    return formattedTime; 
  };
  const formattedtime = formatTime(time)
  return (

    <div className={`px-5 ${send  === "send" ? styles.send : styles.recieve}`}>
        <div className={styles.message_bubble}><p className={styles.para}>{text}</p>
        { formattedtime !== "NaN:NaN" ? <div className={send  === "send" ? styles.time : styles.recievetime}>{formattedtime}</div> : <div className={send  === "send" ? styles.time : styles.recievetime}>just now</div>}
        </div>
        

    </div>
  )
}

export default Messages