import React from 'react'
import styles from './chatpage.module.css'
import Homenavbar from '../../layout/Homenavbar'
import Sidebar from './chatcomponents/Sidebar'
import Chatarea from './chatcomponents/Chatarea'
import { useParams } from 'react-router-dom'

function ChatPage() {
    const { userId,name } = useParams(); 

  return (
    <div>
        <Homenavbar  />
        <div className={`container-fluid ${styles.maindiv}`}>
            <div className={`row  ${styles.row}`}>
                <div className={`col-3 p-0  ${styles.sidebarusers}`}>
                    <Sidebar/>
                </div>
                <div className={`col-9 p-0  ${styles.chatareaforuser}`}>
                    <Chatarea userId={userId} username={name}/>
                </div>
            </div>
             
        </div>
    </div>
  )
}

export default ChatPage