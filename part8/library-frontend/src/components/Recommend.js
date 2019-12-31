import React, { useState } from 'react'
import BookList from './BookList'
import { useApolloClient } from '@apollo/react-hooks'

const Recommend = ({ show, allBooksQuery, userResult }) => {
  const client = useApolloClient()
  const [books, setBooks] = useState([])

  if (!show || userResult.loading) {
    return null
  }

  const user = userResult.data.me

  client.query({
    query: allBooksQuery,
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