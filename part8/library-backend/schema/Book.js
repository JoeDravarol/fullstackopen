const { gql } = require('apollo-server')
const Book = require('../models/book')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const {
  findAuthor,
  incrementBookCount,
  createAuthor
} = require('./helpers/author')
const { isLogin } = require('./helpers/login')

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  extend type Query {
    bookCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
  }

  extend type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
  }

  extend type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const author = await findAuthor(args.author)
      const book = new Book({ ...args })
      // Prevent further action if it's not login
      isLogin(currentUser)

      try {
        if (author !== undefined) {
          const existingAuthor = await incrementBookCount(author)
          book.author = existingAuthor._id
        } else {
          const newAuthor = await createAuthor(args.author)
          book.author = newAuthor._id
        }

        await book.save()
        await book.populate('author').execPopulate()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}