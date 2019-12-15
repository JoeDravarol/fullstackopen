import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import Login from './components/Login'
import BlogList from './components/BlogList'
import blogsService from './services/blogs'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

function App(props) {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      props.setUser(user)
      blogsService.setToken(user.token)
      props.initializeBlogs()
    }
  }, [])

  return (
    <div>
      <Notification />

      {props.isUserNull
        ? <Login />
        : <BlogList />
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isUserNull: state.user === null
  }
}

const actionCreators = {
  initializeBlogs,
  setUser,
}

export default connect(
  mapStateToProps,
  actionCreators
)(App)
