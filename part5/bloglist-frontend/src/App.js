import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogsService from './services/blogs'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  // For Form
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

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
    const userBlogs = await blogsService.getAll()
    const sortBlogsByLikes = userBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

    setBlogs(sortBlogsByLikes)
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
      setUsername('')
      setPassword('')
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

      const returnedBlog = await blogsService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')

      setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
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

      const returnedBlog = await blogsService.updateLikes(blog.id, newBlog)

      setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
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

        setBlogs(blogs.filter(b => b.id !== blog.id))
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
