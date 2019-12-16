const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate('user', { blogs: 0 })

  response.json(blog.toJSON())
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = body.hasOwnProperty('likes')
      ? new Blog({ ...body, user: user.id })
      : new Blog({ ...body, likes: 0, user: user.id });

    if (request.body.hasOwnProperty('title') && request.body.hasOwnProperty('url')) {
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      const populateUser = await Blog.findById(savedBlog._id).populate('user', { blogs: 0 })

      response.status(201).json(populateUser.toJSON())
    } else {
      response.status(400).end()
    }
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else if (blog.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: 'Unauthorize action' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    ...body
  }

  try {
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { blogs: 0 })
    response.json(updatedNote.toJSON())
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  const id = request.params.id
  const blog = await Blog.findById(id)
  const comments = [...blog.comments, body.comment]

  const updatedBlog = await Blog.findByIdAndUpdate(id, { comments }, { new: true }).populate('user', { blogs: 0 })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter