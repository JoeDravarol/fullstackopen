const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message
  }
}

const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: null
  }
}

export const toggleNotification = (message, seconds) => {
  const milliseconds = Math.floor(seconds * 1000)

  return async dispatch => {
    dispatch(
      setNotification(message)
    )

    await setTimeout(() => {
      dispatch(
        removeNotification()
      )
    }, milliseconds)
  }
}

export default reducer