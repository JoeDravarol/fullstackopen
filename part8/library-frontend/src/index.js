import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const token = localStorage.getItem('library-user-token')
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: token ? `Bearer ${token}` : ''
  }
})

ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)