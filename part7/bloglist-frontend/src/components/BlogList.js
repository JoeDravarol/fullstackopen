import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { toggleNotification } from '../reducers/notificationReducer'
import {
  addBlog, updateBlog,
  removeBlog
} from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'

const BlogList = (props) => {
  const [title, resetTitle] = useField('text', 'title')
  const [author, resetAuthor] = useField('text', 'author')
  const [url, resetUrl] = useField('text', 'url')

  const isBlogCreatedByUser = (blog) => {
    // Should be using user's id
    return blog.user.username === props.user.username
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setUser(null)
  }

  const blogFormRef = React.createRef()

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

  const handleRemoveBlog = (blog) => {
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

  return (
    <>
      <h2>blogs</h2>

      <p>{props.user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>Logout</button>

      <BlogForm
        addBlog={addBlog}
        title={title}
        author={author}
        url={url}
        blogFormRef={blogFormRef}
      />

      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          incremetLikes={() => handleIncrementBlogLikes(blog)}
          removeBlog={() => handleRemoveBlog(blog)}
          isBlogCreatedByUser={isBlogCreatedByUser(blog)}
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const actionCreators = {
  setNotification: toggleNotification,
  addBlog,
  updateBlog,
  removeBlog,
  setUser
}

export default connect(
  mapStateToProps,
  actionCreators
)(BlogList)