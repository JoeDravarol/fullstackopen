const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = request.body.hasOwnProperty('likes')
    ? new Blog(request.body)
    : new Blog({ ...request.body, likes: 0 })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter