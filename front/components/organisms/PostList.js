import React from 'react'
import withAllPosts from '../../hoc/withAllPosts'
import PostUpvoter from '../atoms/PostUpvoter'

function Post({ index, post }) {
  return (
    <div>
      <span>{index + 1}. </span>
      <a href={post.url}>{post.title}</a>
      <PostUpvoter id={post.id} votes={post.votes} />
    </div>
  )
}

function PostList({
  data: { loading, error, allPosts, _allPostsMeta },
  loadMorePosts
}) {
  if (error) {
    return <aside>Error loading posts.</aside>
  }
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count
    return (
      <section>
        <ul>
          {allPosts.map((post, index) => (
            <li key={post.id}>
              <Post post={post} index={index} />
            </li>
          ))}
        </ul>
        {areMorePosts ? (
          <button onClick={() => loadMorePosts()}>
            {' '}
            {loading ? 'Loading...' : 'Show More'}{' '}
          </button>
        ) : (
          ''
        )}
      </section>
    )
  }
  return <div>Loading</div>
}

export default withAllPosts(PostList)
