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

  const blog = body.hasOwnProperty('likes')
    ? new Blog(body)
    : new Blog({ ...body, likes: 0 });

  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (request.body.hasOwnProperty('title') && request.body.hasOwnProperty('url')) {
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog.toJSON())
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

  console.log(blog)
  console.log(blog.user)
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
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogs: body.blogs,
  }

  try {
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote.toJSON())
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter