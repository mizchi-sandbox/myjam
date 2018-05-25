import React from 'react'
import withCreatePost from '../../hoc/withCreatePost'

function Submit({ createPost }) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        const form = event.target
        const formData = new window.FormData(form)
        createPost(formData.get('title'), formData.get('url'))
        form.reset()
      }}
    >
      <input placeholder="title" name="title" type="text" required />
      <br />
      <input placeholder="url" name="url" type="url" required />
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default withCreatePost(Submit)
