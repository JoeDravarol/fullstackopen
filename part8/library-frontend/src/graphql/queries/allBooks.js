import { gql } from 'apollo-boost'
import BOOK_DETAILS from '../fragments/bookDetails'

const ALL_BOOKS = gql`
  {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export default ALL_BOOKS