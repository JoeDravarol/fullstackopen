import React from 'react'

const Notification = (props) => {
  const store = props.store
  const notification = store.getState().notification

  if (notification === null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification