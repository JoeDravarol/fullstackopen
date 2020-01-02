const Author = require('../../models/author')

const findAuthor = async (name) => {
  const authors = await Author.find({})
  return authors.find(a =>
    a.name === name
  )
}
const incrementBookCount = async (author) => {
  const updatedAuthor = await Author.findOne({ name: author.name })
  updatedAuthor.bookCount = ++author.bookCount

  await updatedAuthor.save()
  return updatedAuthor
}
const createAuthor = async (name) => {
  const author = new Author({
    name,
    born: null,
    bookCount: 1,
  })
  await author.save()
  return author
}
const setAuthorBornTo = async (author, year) => {
  const updatedAuthor = await Author.findOne({ name: author.name })
  updatedAuthor.born = year

  await updatedAuthor.save()
  return updatedAuthor
}

module.exports = {
  findAuthor,
  incrementBookCount,
  createAuthor,
  setAuthorBornTo
}