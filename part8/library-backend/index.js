require('dotenv').config()
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
  setAuthorBornTo: async (author, year) => {
    const updatedAuthor = await Author.findOne({ name: author.name })
    updatedAuthor.born = year

    await updatedAuthor.save()
    return updatedAuthor
  }
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      return books.reduce((total, book) =>
        String(book.author) === root.id ? ++total : total, 0
      )
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const author = await AuthorHelpers.findAuthor(args.author)
      const book = new Book({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        if (author !== undefined) {
          const existingAuthor = await AuthorHelpers.incrementBookCount(author)
          book.author = existingAuthor._id
        } else {
          const newAuthor = await AuthorHelpers.createAuthor(args.author)
          book.author = newAuthor._id
        }

        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await AuthorHelpers.findAuthor(args.name)
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (author === undefined) return null

      const updatedAuthor = AuthorHelpers
        .setAuthorBornTo(author, args.setBornTo)

      return updatedAuthor
    },
    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'testing') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})