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
    <div className="blog" style={blogStyle}>
      <p className="blog-title" onClick={toggleVisibility}>{blog.title} {blog.author}</p>
      <div className="togglableContent" style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button onClick={incremetLikes}>like</button>
        </div>
        <p>added by {blog.user.name}</p>
        {isBlogCreatedByUser && removeBlogButton()}
      </div>
    </div>
  )
}

export default Blog