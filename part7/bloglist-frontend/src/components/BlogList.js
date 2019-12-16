import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import { toggleNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
  const [title, resetTitle] = useField('text', 'title')
  const [author, resetAuthor] = useField('text', 'author')
  const [url, resetUrl] = useField('text', 'url')

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`} >
            {blog.title} {blog.author}
          </Link>
        </div>
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
  setUser
}

export default connect(
  mapStateToProps,
  actionCreators
)(BlogList)