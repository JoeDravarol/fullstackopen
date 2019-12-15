import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from './hooks'
import Blog from './components/Blog'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Login from './components/Login'
import blogsService from './services/blogs'
import { toggleNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  addBlog, updateBlog,
  removeBlog
} from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

function App(props) {
  const [title, resetTitle] = useField('text', 'title')
  const [author, resetAuthor] = useField('text', 'author')
  const [url, resetUrl] = useField('text', 'url')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      props.setUser(user)
      blogsService.setToken(user.token)
      props.initializeBlogs()
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setUser(null)
  }

  const blogFormRef = React.createRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new Blog" ref={blogFormRef} >
        <Form
          addBlog={addBlog}
          title={{ ...title }}
          author={{ ...author }}
          url={{ ...url }}
        />
      </Togglable >
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value
      }

      props.addBlog(blogObject)
      resetTitle()
      resetAuthor()
      resetUrl()

      props.setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        5
      )
    } catch (exception) {
      console.log(exception)
      props.setNotification('Something went wrong', 5)
    }
  }

  const handleIncrementBlogLikes = async (blog) => {

    try {
      const { user, likes, author, title, url } = blog

      const newBlog = {
        user: user.id,
        likes: likes + 1,
        author,
        title,
        url
      }

      props.updateBlog(blog.id, newBlog)
    } catch (exception) {
      console.log(exception)
      props.setNotification('Something went wrong', 5)
    }
  }

  const handleRemoveBlog = async (blog) => {
    const isConfirm = window.confirm(`Remove blog ${blog.title} ${blog.author}?`)

    if (isConfirm) {
      try {
        props.removeBlog(blog.id)
        props.setNotification(`${blog.title} blog removed`, 5)
      } catch (exception) {
        console.log(exception)
        props.setNotification('Something went wrong', 5)
      }
    }
  }

  const isBlogCreatedByUser = (blog) => {
    // Should be using user's id
    return blog.user.username === props.user.username
  }

  if (props.user === null) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.user.name} logged in</p>
      <button type="submit" onClick={handleLogout} >Logout</button>

      {blogForm()}

      {props.blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          incremetLikes={() => handleIncrementBlogLikes(blog)}
          removeBlog={() => handleRemoveBlog(blog)}
          isBlogCreatedByUser={isBlogCreatedByUser(blog)}
        />
      )}
    </div>
  )
}

const mapStateToDispatch = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const actionCreators = {
  setNotification: toggleNotification,
  initializeBlogs,
  addBlog,
  updateBlog,
  removeBlog,
  setUser
}

export default connect(
  mapStateToDispatch,
  actionCreators
)(App)
