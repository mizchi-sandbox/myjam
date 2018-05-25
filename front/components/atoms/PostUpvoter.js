import React from 'react'
import withUpvote from '../../hoc/withUpvote'

function PostUpvoter({ upvote, votes, id }) {
  return <button onClick={() => upvote(id, votes + 1)}>{votes}</button>
}

export default withUpvote(PostUpvoter)
