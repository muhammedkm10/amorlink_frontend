import React from 'react'
import styles from './chatpage.module.css'
import Homenavbar from '../../layout/Homenavbar'
import Sidebar from './chatcomponents/Sidebar'
import Chatarea from './chatcomponents/Chatarea'
import { useParams } from 'react-router-dom'

function ChatPage() {
    const { userId,name } = useParams(); 

  return (
    
    <div className={styles.fullbody}>
        <Homenavbar page=""  />
        <div className={`container-fluid  text-align-center ${styles.maindiv}`}>
            <div className={`row  ${styles.row}`}>
                <div className={`col-md-3 p-0 m-auto col-2 ${styles.sidebarusers}`}>
                    <Sidebar/>
                </div>
                <div className={`col-md-8 p-0 m-auto  col-10 ${styles.chatareaforuser}`}>
                    <Chatarea userId={userId} username={name}/>
                </div>
            </div>
             
        </div>
    </div>
  )
}

export default ChatPage