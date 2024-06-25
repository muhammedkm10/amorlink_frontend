import React from 'react'
import styles from './messages.module.css'

function Messages({send,text,time}) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp); // Create a Date object
    const hours = date.getHours(); // Get hours
    const minutes = date.getMinutes(); // Get minutes
    const seconds = date.getSeconds(); // Get seconds
    
    // Format hours, minutes, and seconds to ensure they have two digits
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    return formattedTime; // Return the formatted time string
  };
  const formattedtime = formatTime(time)
  console.log(formattedtime);
  return (
    <div className={`px-5 ${send  === "send" ? styles.send : styles.recieve}`}>

        <div className={styles.message_bubble}><p className={styles.para}>{text}</p>
        { formattedtime !== "NaN:NaN" ? <div className={send  === "send" ? styles.time : styles.recievetime}>{formattedtime}</div> : <div className={send  === "send" ? styles.time : styles.recievetime}>just now</div>}

        </div>

    </div>
  )
}

export default Messages