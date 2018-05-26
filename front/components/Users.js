import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Link from "next/link"

const USERS = gql`
  query {
    users {
      id
      name
    }
  }
`

export default function UserList({ loading, error, users }) {
  if (error) {
    return <aside>Error loading posts.</aside>
  }

  return (
    <Query query={USERS}>
      {({ loading, error, data }) => {
        const { users } = data
        return (
          <>
            <h2>Users</h2>
            {users.map(user => (
              <div key={user.id}>
                <Link
                  href={{
                    pathname: "/articles",
                    query: { owner: user.id }
                  }}
                >
                  <a>{user.name}</a>
                </Link>
              </div>
            ))}
          </>
        )
      }}
    </Query>
  )
}
