import React, { useEffect } from 'react'
import { useResource } from './hooks/index'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import blogsService from './services/blogs'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

function App(props) {
  const [users, usersService] = useResource('/api/users')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      props.setUser(user)
      blogsService.setToken(user.token)
      props.initializeBlogs()
    }
  }, [])

  useEffect(async () => {
    await usersService.get()
  }, [])

  const userById = (id) =>
    users.find(r => r.id === id)

  return (
    <div>
      <Router>
        <div>
          <Notification />

          {props.isUserNull
            ? <Login />
            : <BlogList />
          }

          <Route exact path="/users" render={() => <Users users={users} />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog id={match.params.id} />
          } />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isUserNull: state.user === null,
    blogs: state.blogs
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
