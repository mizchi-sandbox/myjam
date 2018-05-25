const { GraphQLServer } = require("graphql-yoga")
const { Prisma } = require("prisma-binding")

const resolvers = {
  Query: {
    posts: (_, args, context, info) => {
      return context.prisma.query.posts(
        {
          where: {
            OR: [
              { title_contains: args.searchString },
              { content_contains: args.searchString }
            ]
          }
        },
        info
      )
    },
    user: (_, args, context, info) => {
      return context.prisma.query.user(
        {
          where: {
            id: args.id
          }
        },
        info
      )
    }
  },
  Mutation: {
    createDraft: (_, args, context, info) => {
      return context.prisma.mutation.createPost(
        {
          data: {
            title: args.title,
            content: args.title,
            author: {
              connect: {
                id: args.authorId
              }
            }
          }
        },
        info
      )
    },
    publish: (_, args, context, info) => {
      return context.prisma.mutation.updatePost(
        {
          where: {
            id: args.id
          },
          data: {
            published: true
          }
        },
        info
      )
    },
    deletePost: (_, args, context, info) => {
      return context.prisma.mutation.deletePost(
        {
          where: {
            id: args.id
          }
        },
        info
      )
    },
    signup: (_, args, context, info) => {
      return context.prisma.mutation.createUser(
        {
          data: {
            name: args.name
          }
        },
        info
      )
    }
  }
}

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "http://localhost:4466"
    })
  })
})
server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`)
)
