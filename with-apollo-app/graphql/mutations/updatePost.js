import gql from 'graphql-tag'

export default gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      __typename
      votes
    }
  }
`
