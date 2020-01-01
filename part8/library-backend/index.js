require('dotenv').config()
const {
  ApolloServer,
  gql,
  UserInputError
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const {
  findAuthor,
  incrementBookCount,
  createAuthor,
  setAuthorBornTo
} = require('./helpers/author')
const { isLogin } = require('./helpers/login')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

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
  type Subscription {
    bookAdded: Book!
  }
`

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
      const books = await Book.find({ author: { $eq: root.id } })
      return books.length
    }
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
    editAuthor: async (root, args, { currentUser }) => {
      const author = await findAuthor(args.name)

      // Prevent further action if it's not login
      isLogin(currentUser)

      if (author === undefined) return null

      const updatedAuthor = setAuthorBornTo(author, args.setBornTo)

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
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

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})