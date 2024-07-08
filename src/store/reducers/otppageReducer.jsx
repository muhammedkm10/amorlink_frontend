const intialOtpPageState = {
  isvisible: false,
}

const otppageReducer = (state = intialOtpPageState, action) => {
  switch (action.type) {
    case 'SHOW OTP PAGE':
      return {
        ...state,
        isvisible: true,
      }
    case 'HIDE OTP PAGE':
      return {
        ...state,
        isvisible: false,
      }
    default:
      return state
  }
}

export default otppageReducer
