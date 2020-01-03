import { gql } from 'apollo-boost'

const ME = gql`
  {
    me {
      username
      favouriteGenre
      id
    }
  }
`

export default ME