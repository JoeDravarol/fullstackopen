import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import {
  Menu as MenuSUi,
  Button
} from 'semantic-ui-react'

const Menu = (props) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setUser(null)
  }

  if (props.user === null) return null

  return (
    <MenuSUi pointing secondary>
      <MenuSUi.Item as={Link} to="/" link>
        blogs
      </MenuSUi.Item>
      <MenuSUi.Item as={Link} to="/users">
        users
      </MenuSUi.Item>
      <MenuSUi.Item>
        {props.user.name} logged in
        <Button type="submit" onClick={handleLogout}>Logout</Button>
      </MenuSUi.Item>
    </MenuSUi>
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