import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import { toggleNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

const BlogList = (props) => {
  const [title, resetTitle] = useField('text', 'title')
  const [author, resetAuthor] = useField('text', 'author')
  const [url, resetUrl] = useField('text', 'url')

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

  return (
    <>
      <h2>blog app</h2>

      <BlogForm
        addBlog={addBlog}
        title={title}
        author={author}
        url={url}
        blogFormRef={blogFormRef}
      />

      <List divided relaxed>
        {props.blogs.map(blog =>
          <List.Item
            as={Link}
            to={`/blogs/${blog.id}`}
            key={blog.id}
          >
            {blog.title} {blog.author}
          </List.Item>
        )}
      </List>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const actionCreators = {
  setNotification: toggleNotification,
  addBlog,
}

export default connect(
  mapStateToProps,
  actionCreators
)(BlogList)