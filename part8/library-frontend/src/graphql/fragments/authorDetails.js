import { gql } from 'apollo-boost'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    id
    born
    bookCount
  }
`

export default AUTHOR_DETAILS