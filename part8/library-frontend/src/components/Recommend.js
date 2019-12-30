import React from 'react'
import BookList from './BookList'

const Recommend = ({ show, allBooksResult, userResult }) => {
  if (!show) {
    return null
  }

  if (allBooksResult.loading && userResult.loading) {
    return null
  }

  const books = allBooksResult.data.allBooks
  const user = userResult.data.me

  const byFavouriteGenre = (book) =>
    book.genres.includes(user.favouriteGenre)

  const filteredBooks = () => books.filter(byFavouriteGenre)

  const haveBooksInFavouriteGenre = filteredBooks().length !== 0

  const favouriteBooks = () => {
    return (
      <>
        <p>books in your favourite genre <strong>{user.favouriteGenre}</strong></p>

        <BookList
          books={filteredBooks()}
        />
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