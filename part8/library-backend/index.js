require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const AuthorHelpers = {
  findAuthor: async (name) => {
    const authors = await Author.find({})
    return authors.find(a =>
      a.name === name
    )
  },
  incrementBookCount: async (author) => {
    const updatedAuthor = await Author.findOne({ name: author.name })
    updatedAuthor.bookCount = ++author.bookCount
    await updatedAuthor.save()

    return updatedAuthor
  },
  createAuthor: async (name) => {
    const author = new Author({
      name,
      born: null,
      bookCount: 1,
    })
    await author.save()
    return author
  },
  setAuthorBornTo: (author, year) => {
    const updatedAuthor = { ...author, born: year }
    authors = authors.map(a =>
      a.name !== author.name
        ? a
        : updatedAuthor
    )
    return updatedAuthor
  }
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})
      return books
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      return books.reduce((total, book) =>
        book.author === root.name ? ++total : total, 0
      )
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await AuthorHelpers.findAuthor(args.author)
      const book = new Book({ ...args })

      if (author !== undefined) {
        const existingAuthor = await AuthorHelpers.incrementBookCount(author)
        book.author = existingAuthor._id
      } else {
        const newAuthor = await AuthorHelpers.createAuthor(args.author)
        book.author = newAuthor._id
      }

      await book.save()
      return book
    },
    editAuthor: (root, args) => {
      const author = AuthorHelpers.findAuthor(args.name)

      if (author === undefined) return null

      const updatedAuthor = AuthorHelpers
        .setAuthorBornTo(author, args.setBornTo)

      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})