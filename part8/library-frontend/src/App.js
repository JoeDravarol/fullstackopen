import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import Login from './components/Login'
import Recommend from './components/Recommend'

import ALL_AUTHORS from './graphql/queries/allAuthors'
import ALL_BOOKS from './graphql/queries/allBooks'
import ME from './graphql/queries/userProfile'
import BOOK_ADDED from './graphql/subscriptions/bookAdded'
import CREATE_BOOK from './graphql/mutations/createBook'
import SET_BIRTH_YEAR from './graphql/mutations/setAuthorBirthYear'
import LOGIN from './graphql/mutations/login'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')

    if (token) setToken(token)
  }, [])

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
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

      <Recommend
        show={page === 'recommend'}
        userResult={user}
      />
    </div>
  )
}

export default App