import React, { useState } from 'react'
import GenreButtons from './GenreButtons'
import BookList from './BookList'

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState(null)

  if (!show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  const filteredBooks = () => {
    const byGenre = (book) =>
      book.genres.includes(filter)

    return books.filter(byGenre)
  }

  return (
    <div>
      <h2>books</h2>

      {filter
        ? <p>in genre <strong>{filter}</strong></p>
        : null
      }

      <BookList
        books={
          !filter
            ? books
            : filteredBooks()
        }
      />
      <GenreButtons
        books={books}
        setFilter={setFilter}
      />
    </div>
  )
}

export default Books