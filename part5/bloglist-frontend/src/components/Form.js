import React from 'react'

const Form = ({ addBlog, title, author, url }) => {
 
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title.value}
          name="Title"
          onChange={title.onChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author.value}
          name="Author"
          onChange={author.onChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url.value}
          name="Url"
          onChange={url.onChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default Form