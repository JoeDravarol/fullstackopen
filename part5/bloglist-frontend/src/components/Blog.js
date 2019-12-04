import React, { useState } from 'react'

const Blog = ({ blog, incremetLikes, removeBlog, isBlogCreatedByUser }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removeBlogButton = () => (
    <button
      style={showWhenVisible}
      blog={blog}
      onClick={removeBlog}>
      remove
    </button>
  )

  return (
    <div style={blogStyle}>
      <div>
        <p onClick={toggleVisibility}>{blog.title} {blog.author}</p>
        <a href={blog.url} style={showWhenVisible}>{blog.url}</a>
        <div style={showWhenVisible}>
          {blog.likes} likes
          <button onClick={incremetLikes}>like</button>
        </div>
        <p style={showWhenVisible}>
          added by {blog.user.name}
        </p>
        {isBlogCreatedByUser && removeBlogButton()}
      </div>
    </div>
  )
}

export default Blog