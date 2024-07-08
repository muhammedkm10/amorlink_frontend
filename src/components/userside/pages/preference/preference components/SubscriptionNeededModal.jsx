import React from 'react'
import styles from './preferecescomponents.module.css'
import { Link } from 'react-router-dom'

function SubscriptionNeededModal({ modalvisiblefunction }) {
  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <h3 className="text-warning">Premium Subscription! </h3>
          <p className={styles.para_for_subscription}>
            At AmorLink, we understand that finding a meaningful and lasting
            relationship requires the right tools and opportunities. While our
            free membership gives you access to basic features, upgrading to our
            Premium Subscription allows you to unlock the full potential of our
            platform, including the ability to request matches with your ideal
            partners.
          </p>
          <p className={styles.para_for_subscription}>
            By upgrading to a Premium Subscription, you gain exclusive benefits
            designed to enhance your journey towards finding love:
          </p>
          <ul className={styles.subscription_benefits}>
            <li className={styles.lis}>
              📨 **Request Unlimited Matches:** Connect with potential partners
              directly and express your interest without any restrictions.
            </li>
            <li className={styles.lis}>
              🔍 **Advanced Search Filters:** Refine your search to find the
              perfect match based on specific criteria such as interests,
              values, and goals.
            </li>
            <li className={styles.lis}>
              💌 **Priority Messaging:** Ensure your messages are seen first and
              never miss out on an important connection.
            </li>
            <li className={styles.lis}>
              🎁 **Access Premium Features:** Enjoy additional perks like
              profile highlighting and access to exclusive community events.
            </li>
            <li className={styles.lis}>
              {' '}
              **Showing user photos:** Subscribed users can only see the images
              of the preferences
            </li>
          </ul>
          <p className={styles.para_for_subscription}>
            Don't miss out on the chance to make meaningful connections. Upgrade
            to a Premium Subscription today and start requesting matches with
            confidence!
          </p>

          <div className={`${styles.buttonContainer} p-3 `}>
            <button
              id={styles.fileinput}
              className={styles.modal_close}
              onClick={() => modalvisiblefunction(false)}
            >
              close
            </button>
            <Link to="/subscriptions">
              <button id={styles.fileinput} className={styles.modal_close1}>
                go to our plans
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionNeededModal
