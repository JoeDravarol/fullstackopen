const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  const milliseconds = Math.floor(seconds * 1000)

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })

    await setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: null
      })
    }, milliseconds)
  }
}

export default notificationReducer