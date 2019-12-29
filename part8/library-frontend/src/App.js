import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import Login from './components/Login'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      id
      genres
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      published
      author
      id
      genres
    }
  }
`

const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      born
      bookCount
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem('library-user-token')

    if (token) setToken(token)
  }, [])

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const [editAuthor] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }
      <Menu
        setPage={setPage}
        token={token}
        logout={logout}
      />

      <Authors
        show={page === 'authors'}
        result={allAuthors}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={allBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <Login
        show={page === 'login'}
        login={login}
        setToken={setToken}
        setPage={setPage}
        handleError={handleError}
      />

    </div>
  )
}

export default App