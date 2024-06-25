import React from 'react'
import styles from './messageinput.module.css'

function MessageInput({onChange,message,onSend}) {
  return (
    <div className={`container ${styles.messageinput}`}>
      <div className="row m-auto">
            <input className={`col-md-10 col-8 ${styles.sendmessage}`} value={message} onChange={(e)=>onChange(e.target.value)} type="text" placeholder='text something' />
        <div className="col-md-1 col-2 p-0">
        <button onClick={()=>onSend(message)} className={styles.sendbutton}>send</button>
        </div>
        </div>
    </div>
  )
}

export default MessageInput