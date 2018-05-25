import { graphql } from 'react-apollo'
import allPosts, { allPostsQueryVars } from '../graphql/queries/allPosts'
import createPost from '../graphql/mutations/createPost'

export default graphql(createPost, {
  props: ({ mutate }) => ({
    createPost: (title, url) =>
      mutate({
        variables: { title, url },
        update: (proxy, { data: { createPost } }) => {
          const data = proxy.readQuery({
            query: allPosts,
            variables: allPostsQueryVars
          })
          proxy.writeQuery({
            query: allPosts,
            data: {
              ...data,
              allPosts: [createPost, ...data.allPosts]
            },
            variables: allPostsQueryVars
          })
        }
      })
  })
})
