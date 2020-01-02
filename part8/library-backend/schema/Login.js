const { gql, UserInputError } = require('apollo-server')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const typeDefs = gql`
  type Token {
    value: String!
  }
  extend type Mutation {
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Mutation: {
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

module.exports = {
  typeDefs,
  resolvers
}