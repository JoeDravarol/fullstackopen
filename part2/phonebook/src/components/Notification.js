import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, styles } = { ...notification }

  return (
    <div className={styles}>
      <h2>{message}</h2>
    </div>
  )
}

export default Notification