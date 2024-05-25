import React from 'react'
import styles from './Userprofile.module.css'
import Homenavbar from '../../layout/Homenavbar'
import profile from  '../../../../assets/images/image.png'

function Userprofile() {
  return (
    <div>
        <Homenavbar/>
        <div className={styles.fullbody}>
            <div className={`container ${styles.head}`}>
                    <div className="row ">
                        <div className={`col-md-6 col-12 ${styles.firstside}`}>
                             <img src={profile} alt="" className={styles.profile}/>
                        </div>
                        <div className={`col-md-6 col-12 ${styles.secondside}`}>
                                <div className={styles.basic}>
                                    <h1>Duddle dominic</h1>
                                    <h4>23 years old</h4>
                                    <h4>India</h4>
                                </div>
                                <div className={styles.location}>
                                      <h4>Software engineer</h4>
                                      <h5>Living in London</h5>
                                </div>
                                <div className={styles.about}>
                                  <h3>About me</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis at cumque tenetur numquam ipsum volupta
                                      te doloribus delectus voluptas ullam commodi culpa ex quibusdam
                                      , nesciunt libero dolorum harum soluta veniam. Incidunt.</p>
                                </div>
                            </div>
                    </div>
                  
            </div>
        </div>
    </div>
  )
}

export default Userprofile