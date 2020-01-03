import React, { useState } from 'react'
import BookList from './BookList'
import { useApolloClient } from '@apollo/react-hooks'
import ALL_BOOKS_BY_GENRE from '../graphql/queries/allBooksByGenre'

const Recommend = ({ show, userResult }) => {
  const client = useApolloClient()
  const [books, setBooks] = useState([])

  if (!show || userResult.loading) {
    return null
  }

  const user = userResult.data.me

  client.query({
    query: ALL_BOOKS_BY_GENRE ,
    variables: { genre: user.favouriteGenre }
  }).then(result => {
    setBooks(result.data.allBooks)
  })

  const haveBooksInFavouriteGenre = books.length !== 0

  const favouriteBooks = () => {
    return (
      <>
        <p>books in your favourite genre <strong>{user.favouriteGenre}</strong></p>
        <BookList books={books} />
      </>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>

      {haveBooksInFavouriteGenre
        ? favouriteBooks()
        : <p>no book in your favourite genre</p>
      }
    </div>
  )
}

export default Recommend