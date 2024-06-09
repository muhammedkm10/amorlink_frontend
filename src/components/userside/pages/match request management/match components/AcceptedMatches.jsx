import React from 'react'
import styles from './matchcomponents.module.css'
import image from '../../../../../assets/images/home fixed.jpg'
import {Link} from 'react-router-dom'

function AcceptedMatches() {
  return (
    <div className={`container-fluid ${styles.fullbody}`}>
        <div className={`container ${styles.wrapper}`}> 
             <div className="row justify-content-evenly text-center">
             <div className={`col-md-2 col-12  ${styles.image}`}>
                <img src={image} width="50px" height="50px" alt="" />

           </div>
           <div className={`col-md-10 col-12 ${styles.details}`}>
               <div>
                <h5 className='mt-2'>Muhammed </h5>
                </div>
                <div className='d-flex justify-content-center align-items-center col-12 ms-lg-5'>
                <button title="remove"  className={`fa fa-times fa-2x  ${styles.closebutton}`}></button>
                <Link ><button className={styles.button1}>accept</button></Link>
                </div>
           </div>
                
             </div>
           
        </div>
        
    </div>
  )
}

export default AcceptedMatches