import React from "react"
import Header from "../components/Header"
import Article from "../components/Article"
import getInitialProps from "../hoc/getInitialProps"

const enhancer = getInitialProps(ctx => ctx.query)

export default enhancer(props => {
  return (
    <>
      <Header />
      <Article id={props.id} />
    </>
  )
})
