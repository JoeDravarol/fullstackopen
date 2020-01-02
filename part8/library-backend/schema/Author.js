const { gql } = require('apollo-server')
const Author = require('../models/author')
const Book = require('../models/book')
const {
  findAuthor,
  setAuthorBornTo
} = require('./helpers/author')
const { isLogin } = require('./helpers/login')

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }
  extend type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: { $eq: root.id } })
      return books.length
    }
  },
  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      const author = await findAuthor(args.name)

      // Prevent further action if it's not login
      isLogin(currentUser)

      if (author === undefined) return null

      const updatedAuthor = setAuthorBornTo(author, args.setBornTo)

      return updatedAuthor
    },
  }
}

module.exports = {
  typeDefs,
  resolvers
}