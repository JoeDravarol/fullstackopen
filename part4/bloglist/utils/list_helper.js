const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const reducer = (sum, likes) => {
    return sum + likes
  }
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((favoriteBlog, currentBlog) => {
    return favoriteBlog && favoriteBlog.likes > currentBlog.likes ? favoriteBlog : currentBlog;
  }, null)

  if (favoriteBlog === null) {
    return favoriteBlog
  }

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const mostBlog = _.maxBy(blogs, 'blogs')

  if (mostBlog === undefined) {
    return null
  }

  return {
    author: mostBlog.author,
    blogs: mostBlog.blogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}