const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blog post should have a unique identifier named id', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    const blogToView = blogsAtEnd[0]

    expect(blogToView.id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'The ways of integration testing',
      author: 'Mii',
      url: 'https://testingblog.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'The ways of integration testing'
    )
  })

  test('missing likes property, should default to likes: 0', async () => {
    const newBlog = {
      title: 'Testing likes property',
      author: 'Mii',
      url: 'https://testingblog.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogToView = blogsAtEnd.find(blog => blog.title === 'Testing likes property')

    expect(blogToView.likes).toBe(0)
  })

  test('fails with missing title and url data', async () => {
    const newBlog = {
      author: 'Mii',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
    expect(titles).not.toContain('Tasty treats around the world')
  })
})

describe('modification of a blog', () => {
  test('succeeds with status code 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blog = {
      ...blogToUpdate,
      likes: 320
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    expect(updatedBlog.likes).toBe(320)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'tester', password: 'secret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Wamai',
      name: 'Wamu',
      password: 'salami'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tester',
      name: 'Admin',
      password: 'asdf',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
}) 