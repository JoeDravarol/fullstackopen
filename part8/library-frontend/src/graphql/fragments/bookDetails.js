import { gql } from 'apollo-boost'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  id
  genres
  author {
    name
    id
    born
    bookCount
  }
}
`

export default BOOK_DETAILS