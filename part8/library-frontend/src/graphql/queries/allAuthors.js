import { gql } from 'apollo-boost'
import AUTHOR_DETAILS from '../fragments/authorDetails'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export default ALL_AUTHORS