import React from 'react'

const Form = ({ addBlog, title, author, url }) => {

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input {...title} />
      </div>
      <div>
        author:
        <input {...author} />
      </div>
      <div>
        url:
        <input {...url} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default Form