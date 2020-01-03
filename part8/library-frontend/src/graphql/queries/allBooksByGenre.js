import { gql } from 'apollo-boost'
import BOOK_DETAILS from '../fragments/bookDetails'

const ALL_BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export default ALL_BOOKS_BY_GENRE