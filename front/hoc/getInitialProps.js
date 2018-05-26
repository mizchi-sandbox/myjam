import React from "react"
export default function getInitialProps(func) {
  return Wrapped =>
    class GetInitialProps extends React.PureComponent {
      static async getInitialProps(ctx) {
        return func(ctx)
      }

      render() {
        return <Wrapped {...this.props} />
      }
    }
}
