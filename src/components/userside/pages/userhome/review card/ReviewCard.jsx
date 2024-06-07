import React from 'react'
import styles from './reviewcard.module.css'


function ReviewCard({ name, review, rating, date }) {
  return (
        <div className="col-md-3 mb-4 p-4">
          <div className={`${styles.card} p-3 h-100`} >
            <div className={`${styles.card_body} `}>
              <h5 className={`${styles.card_title} `}>{name}</h5>
              <h6 className={`${styles.card_subtitle} mb-2  `}>{date}</h6>
              <p className={`${styles.card_text1}`}>{review}</p>
              <div className={`${styles.card_text}`}>
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
              </div>
            </div>
          </div>
        </div>
  )
}

export default ReviewCard