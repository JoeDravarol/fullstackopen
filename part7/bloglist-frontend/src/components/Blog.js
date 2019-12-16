import React from 'react'
import { connect } from 'react-redux'
import { toggleNotification } from '../reducers/notificationReducer'
import { updateBlog } from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'

const Blog = (props) => {
  const blog = props.blog

  if (blog === undefined) return null

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

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => handleIncrementBlogLikes(blog)}>like</button>
        <p>added by {blog.user.name}</p>
      </div>
    </div>
  )
}

const findBlogToRender = (id, blogs) =>
  blogs.find(b => b.id === id)

const mapStateToProps = (state, ownProps) => {
  return {
    blog: findBlogToRender(
      ownProps.id,
      state.blogs
    )
  }
}

const actionCreators = {
  setNotification: toggleNotification,
  setUser,
  updateBlog
}

export default connect(
  mapStateToProps,
  actionCreators
)(Blog)