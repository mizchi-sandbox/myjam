import React from "react"
import Header from "../components/Header"
import User from "../components/User"
import DraftForm from "../components/DraftForm"
import getInitialProps from "../hoc/getInitialProps"

const enhancer = getInitialProps(ctx => ctx.query)

export default enhancer(props => {
  return (
    <>
      <Header />
      <User id={props.id} />
    </>
  )
})
