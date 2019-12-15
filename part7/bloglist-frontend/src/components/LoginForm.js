import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { toggleNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = (props) => {
  const [username, resetUsername] = useField('text', 'username')
  const [password, resetPassword] = useField('password', 'password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      props.setNotification('Login successful', 3)
      props.setUser(user)
      blogsService.setToken(user.token)
      props.initializeBlogs()
      resetUsername()
      resetPassword()
    } catch (exception) {
      console.log(exception)

      props.setNotification('Wrong username or password', 5)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

const actionCreators = {
  setNotification: toggleNotification,
  setUser,
  initializeBlogs
}

export default connect(
  null,
  actionCreators
)(LoginForm)