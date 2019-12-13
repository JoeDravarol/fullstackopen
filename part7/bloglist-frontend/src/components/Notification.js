import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <>
      <h2>{message}</h2>
    </>
  )
}

export default Notification