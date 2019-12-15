import React from 'react'
import Togglable from './Togglable'
import Form from './Form'

const BlogForm = (props) => {
  return (
    <Togglable buttonLabel="new Blog" ref={props.blogFormRef} >
      <Form
        addBlog={props.addBlog}
        title={{ ...props.title }}
        author={{ ...props.author }}
        url={{ ...props.url }}
      />
    </Togglable >
  )
}

export default BlogForm