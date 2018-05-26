import React from "react"
import Header from "../components/Header"
import UserArticles from "../components/UserArticles"
import DraftForm from "../components/DraftForm"
import getInitialProps from "../hoc/getInitialProps"

const enhancer = getInitialProps(ctx => ctx.query)

export default enhancer(props => {
  return (
    <>
      <Header />
      <UserArticles ownerId={props.owner} />
    </>
  )
})
