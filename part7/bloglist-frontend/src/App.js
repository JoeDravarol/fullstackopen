import React, { useState, useEffect } from 'react'
import { useField, useResource } from './hooks'
import Blog from './components/Blog'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'

function App() {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  // For Form
  const [username, resetUsername] = useField('text', 'username')
  const [password, resetPassword] = useField('password', 'password')
  const [title, resetTitle] = useField('text', 'title')
  const [author, resetAuthor] = useField('text', 'author')
  const [url, resetUrl] = useField('text', 'url')
  // blogsService
  const [blogs, blogsService] = useResource('/api/blogs')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogsService.setToken(user.token)
      getUserBlogs()
    }
  }, [])

  const getUserBlogs = async () => {
    await blogsService.get()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setNotification('Login sucessful')
      setTimeout(() => {
        setNotification(null)
      }, 3000)

      setUser(user)
      blogsService.setToken(user.token)
      getUserBlogs()
      resetUsername()
      resetPassword()
    } catch (exception) {
      console.log(exception)

      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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

      await blogsService.create(blogObject)

      resetTitle()
      resetAuthor()
      resetUrl()

      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)

      setNotification('Something went wrong')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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

      await blogsService.update(blog.id, newBlog)
    } catch (exception) {
      console.log(exception)

      setNotification('Something went wrong')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleRemoveBlog = async (blog) => {
    const isConfirm = window.confirm(`Remove blog ${blog.title} ${blog.author}?`)

    if (isConfirm) {
      try {
        await blogsService.remove(blog.id)

        setNotification(`${blog.title} blog removed`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (exception) {
        console.log(exception)

        setNotification('Something went wrong')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  const isBlogCreatedByUser = (blog) => {
    // Should be using user's id
    return blog.user.username === user.username
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...username} />
          </div>
          <div>
            password
            <input {...password} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification} />

      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout} >Logout</button>

      {blogForm()}

      {blogs.map(blog =>
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

export default App
