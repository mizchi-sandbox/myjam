import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Link from "next/link"
import DraftForm from "./DraftForm"

const USER_ARTICLES = gql`
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

export default function UserArticles(props) {
  const { ownerId } = props
  return (
    <Query query={USER_ARTICLES} variables={{ id: ownerId }}>
      {({ loading, error, refetch, data: { user } }) => {
        if (error) {
          return <aside>Error</aside>
        }

        if (loading) {
          return <p>Loading...</p>
        }

        return (
          <>
            Name: {user.name}
            <hr />
            <DraftForm ownerId={ownerId} onDraftCreated={() => refetch()} />
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
