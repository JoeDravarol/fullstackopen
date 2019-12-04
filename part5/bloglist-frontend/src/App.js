import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogsService from './services/blogs'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  // For Form
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

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
        username, password,
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

  const handleTitleChange = event => setTitle(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)

  const blogFormRef = React.createRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new Blog" ref={blogFormRef} >
        <Form
          addBlog={addBlog}
          title={{
            value: title,
            onChange: handleTitleChange
          }}
          author={{
            value: author,
            onChange: handleAuthorChange
          }}
          url={{
            value: url,
            onChange: handleUrlChange
          }}
        />
      </Togglable >
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
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
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
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
  );
}

export default App;
