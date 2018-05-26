import React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const CREATE_DRAFT = gql`
  mutation createDraft($authorId: ID!, $title: String!, $content: String!) {
    createDraft(authorId: $authorId, title: $title, content: $content) {
      id
    }
  }
`

export default function DraftForm(props) {
  const { ownerId, onDraftCreated } = props
  return (
    <Mutation mutation={CREATE_DRAFT}>
      {(createDraft, { data }) => (
        <>
          <form
            onSubmit={async event => {
              event.preventDefault()
              const form = event.target
              const formData = new window.FormData(form)
              const variables = {
                title: formData.get("title"),
                content: formData.get("content"),
                authorId: ownerId
              }
              await createDraft({ variables })
              form.reset()
              onDraftCreated()
            }}
          >
            <input placeholder="title" name="title" type="text" required />
            <br />
            <textarea
              placeholder="content"
              name="content"
              type="text"
              required
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </Mutation>
  )
}
