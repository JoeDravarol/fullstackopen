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

afterAll(() => {
  mongoose.connection.close()
}) 