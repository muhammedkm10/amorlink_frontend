import React, { useEffect, useState } from 'react'
import styles from './upgradePlan.module.css'
import { authentcatedApiClient } from '../../../../api/axiosconfig'
import { backendurls } from '../../../../api/backendEndpoints'
import { ClipLoader } from 'react-spinners'
import redirectToCheckout from './redirection_to_checkout'

function UpgradePlan({
  modalShowMethod,
  expiry_date,
  formatDate,
  user_plan_id,
}) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [newExpiryDate, setNewExpiryDate] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setloading] = useState(false)

  // useeffect for finding the new expiry date

  useEffect(() => {
    if (expiry_date && selectedOption) {
      NewExpiryDate(selectedOption)
    }
  }, [expiry_date, selectedOption])

  // finding new expiry date
  const NewExpiryDate = (selectedOption) => {
    const new_date = new Date(expiry_date)
    new_date.setMonth(new_date.getMonth() + parseInt(selectedOption) + 1)

    setNewExpiryDate(new_date)
  }

  // handling the change in dropdown
  const ChangeHandling = (e) => {
    setSelectedOption(e.target.value)
  }

  //  calling the api to create a payment intent and the getting the session id
  const CreatePaymentIntent = async (validity_months) => {
    setloading(true)
    if (!validity_months) {
      setloading(false)
      setMessage('please select an appropriate upgrade option')
    } else {
      try {
        const response = await authentcatedApiClient.post(
          `${backendurls.createintent}/${validity_months}`,
          {},
          {
            headers: {
              details: 'upgrade_plan',
            },
          },
        )
        if (response.status == 200) {
          const session_id = response.data.sessionId
          setloading(false)
          redirectToCheckout(session_id)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (!modalShowMethod) return null

  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <h3> Choose your upgrade:</h3>
          <div className={styles.package_details}>
            <h6 className="p-2 ">
              Your plan will expire on :{' '}
              <span className=" text-warning">{expiry_date}</span>
            </h6>
            {newExpiryDate != null && (
              <h6 className="p-2 ">
                New expiry date will be :{' '}
                <span className="text-warning">
                  {formatDate(newExpiryDate)}
                </span>
              </h6>
            )}

            <label>
              <select
                className={styles.dropdown}
                onChange={(e) => ChangeHandling(e)}
              >
                <option value="">selct an upgrade plan</option>
                <option value={6}>Extend by 6 months</option>
                <option value={12}>Extend by 1 year</option>
              </select>
            </label>
          </div>
          <div className="p-3 d-flex">
            <button
              id={styles.fileinput}
              className={styles.modal_close}
              onClick={() => modalShowMethod(false)}
            >
              close
            </button>
            <button
              id={styles.fileinput}
              onClick={() => CreatePaymentIntent(selectedOption)}
              className={styles.modal_close1}
            >
              pay for {selectedOption} months
            </button>
          </div>
          {message && <p className="text-danger">{message}</p>}
          {loading && (
            <div className="spinner-container">
              <ClipLoader size={30} color={'#123abc'} loading={loading} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UpgradePlan
