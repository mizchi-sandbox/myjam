const path = require("path")
const { GraphQLServer } = require("graphql-yoga")
const { Prisma } = require("prisma-binding")
const Query = require("./queries")
const Mutation = require("./mutations")

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, "schema.graphql"),
  resolvers: { Query, Mutation },
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: path.join(__dirname, "generated/prisma.graphql"),
      endpoint: "http://localhost:4466"
    })
  })
})

server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`)
)
