const { AuthenticationError } = require('apollo-server')

const isLogin = (currentUser) => {
  if (!currentUser) {
    throw new AuthenticationError('not authenticated')
  }
}

module.exports = { isLogin }