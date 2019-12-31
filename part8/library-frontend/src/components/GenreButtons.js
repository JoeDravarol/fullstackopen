import React from 'react'

const GenreButtons = ({ books, filterBooksByGenre }) => {
  const genresWithDuplicate = books.reduce((total, book) => {
    const genres = book.genres.map(g => g)
    return [...total, ...genres]
  }, [])
  const genres = [...new Set(genresWithDuplicate)]

  return (
    <div>
      {genres.map(genre =>
        <button
          key={genre}
          onClick={() => filterBooksByGenre(genre)}
        >
          {genre}
        </button>
      )}
      <button
        key='all genres'
        onClick={() => filterBooksByGenre(null)}
      >
        all genres
        </button>
    </div >
  )
}

export default GenreButtons