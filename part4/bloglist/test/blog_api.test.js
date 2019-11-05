const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blog post unique identifier should be named id', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  const blogToView = blogsAtEnd[0]

  expect(blogToView.id).toBeDefined()
})

test('a valid blog can be added', async () => {
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

afterAll(() => {
  mongoose.connection.close()
}) 