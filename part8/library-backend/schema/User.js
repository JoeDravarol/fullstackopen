const { gql } = require('apollo-server')
const User = require('../models/user')

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  extend type Query {
    me: User
  }
  extend type Mutation {
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
  }
}

module.exports = {
  typeDefs,
  resolvers
}