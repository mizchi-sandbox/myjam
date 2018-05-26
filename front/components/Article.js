import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const ARTICLE = gql`
  query article($id: ID!) {
    article(id: $id) {
      id
      title
      content
    }
  }
`

export default function Article(props) {
  const { id } = props
  return (
    <Query query={ARTICLE} variables={{ id }}>
      {({ loading, error, data }) => {
        if (error) return <aside>Error</aside>
        if (loading) return <p>Loading...</p>

        const { article } = data

        return (
          <>
            <h1>{article.title}</h1>
            <div>{article.content}</div>
          </>
        )
      }}
    </Query>
  )
}
