import { graphql } from 'react-apollo'
import allPosts, { allPostsQueryVars } from '../graphql/queries/allPosts'

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts, {
  options: {
    variables: allPostsQueryVars
  },
  props: ({ data }) => {
    return {
      data,
      loadMorePosts: () => {
        return data.fetchMore({
          variables: {
            skip: data.allPosts.length
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return {
              ...previousResult,
              // Append the new posts results to the old one
              allPosts: [
                ...previousResult.allPosts,
                ...fetchMoreResult.allPosts
              ]
            }
          }
        })
      }
    }
  }
})
