import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => {
  if (message === null) return null

  return (
    <>
      <h2>{message}</h2>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

export default connect(mapStateToProps)(Notification)