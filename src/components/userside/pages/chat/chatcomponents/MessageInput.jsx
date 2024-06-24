import React from 'react'
import styles from './messageinput.module.css'

function MessageInput({onChange,message,onSend}) {
  return (
    <div className={styles.messageinput}>
        <div>
            <input className={styles.sendmessage} value={message} onChange={(e)=>onChange(e.target.value)} type="text" placeholder='text something' />
        </div>
        <button onClick={()=>onSend(message)} className={styles.sendbutton}>send</button>
    </div>
  )
}

export default MessageInput