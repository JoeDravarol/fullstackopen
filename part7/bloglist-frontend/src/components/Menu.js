import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'

const Menu = (props) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setUser(null)
  }

  if (props.user === null) return null

  return (
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {props.user.name} logged in
      <button type="submit" onClick={handleLogout}>Logout</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { setUser }
)(Menu)