import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Link from "next/link"
import DraftForm from "./DraftForm"

const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      articles {
        id
        title
      }
    }
  }
`

export default function User(props) {
  const { id } = props
  return (
    <Query query={USER} variables={{ id }}>
      {({ loading, error, refetch, data }) => {
        if (error) return <aside>Error</aside>
        if (loading) return <p>Loading...</p>

        const { user } = data
        return (
          <>
            Name: {user.name}
            <hr />
            <DraftForm ownerId={id} onDraftCreated={() => refetch()} />
            {user.articles.map(article => {
              return (
                <div key={article.id}>
                  <Link
                    href={{ pathname: "/article", query: { id: article.id } }}
                  >
                    <a>{article.title}</a>
                  </Link>
                </div>
              )
            })}
          </>
        )
      }}
    </Query>
  )
}
