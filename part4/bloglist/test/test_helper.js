const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "Tasty treats around the world",
    "author": "Mary Jane",
    "url": "https://tastytreats.wordpress.com/",
    "likes": 300
  },
  {
    "title": "Your introduction to tech meetup",
    "author": "Vasily Truvult",
    "url": "https://fakesite.com/",
    "likes": "50"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}