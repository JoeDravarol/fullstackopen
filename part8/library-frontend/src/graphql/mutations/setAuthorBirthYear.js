import { gql } from 'apollo-boost'
import AUTHOR_DETAILS from '../fragments/authorDetails'

const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export default SET_BIRTH_YEAR