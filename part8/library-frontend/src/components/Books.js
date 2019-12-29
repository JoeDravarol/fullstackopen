import React, { useState } from 'react'
import GenreButtons from './GenreButtons'

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState(null)

  if (!show) {
    return null
  }

  if (result.loading) {
    return null
  }

  const books = result.data.allBooks

  const bookList = (books) => {
    return (
      <>
        {books.map(b =>
          <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        )}
      </>
    )
  }

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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {!filter
            ? bookList(books)
            : bookList( filteredBooks() )
          }
        </tbody>
      </table>
      <GenreButtons
        books={books}
        setFilter={setFilter}
      />
    </div>
  )
}

export default Books