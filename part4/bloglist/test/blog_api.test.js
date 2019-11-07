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

test('a blog with likes property missing, should default to 0', async () => {
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

test('blog without title and url is not added', async () => {
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

test('deleting specific blog', async () => {
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

test('updating specific blog', async () => {
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

afterAll(() => {
  mongoose.connection.close()
}) 