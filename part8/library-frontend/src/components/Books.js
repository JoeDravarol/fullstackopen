import React, { useState } from 'react'
import GenreButtons from './GenreButtons'
import BookList from './BookList'
import { useApolloClient } from '@apollo/react-hooks'

const Books = ({ show, result, allBooksQuery }) => {
  const client = useApolloClient()
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)

  const filterBooksByGenre = async (genre) => {
    const { data } = await client.query({
      query: allBooksQuery,
      variables: { genre }
    })
    setBooks(data.allBooks)
    setGenre(genre)
  }

  if (!show || result.loading) {
    return null
  }

  const allBooks = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      {genre
        ? <p>in genre <strong>{genre}</strong></p>
        : null
      }

      <BookList
        books={!genre
          ? allBooks
          : books
        }
      />
      <GenreButtons
        books={allBooks}
        filterBooksByGenre={filterBooksByGenre}
      />
    </div>
  )
}

export default Books