import React from 'react'
import styles from './messages.module.css'

function Messages({send,text}) {
  console.log(send);
  return (
    <div className={`px-5 ${send  === "send" ? styles.send : styles.recieve}`}>
        <div className={styles.message_bubble}><p className={styles.para}>{text}</p></div>
    </div>
  )
}

export default Messages