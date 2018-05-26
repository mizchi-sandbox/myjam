const path = require("path")
const { GraphQLServer } = require("graphql-yoga")
const { Prisma } = require("prisma-binding")

const resolvers = {
  Query: {
    article: (_, args, context, info) => {
      return context.prisma.query.article(
        {
          where: {
            id: args.id
          }
        },
        info
      )
    },
    articles: (_, args, context, info) => {
      return context.prisma.query.articles(
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
    },
    users: (_, args, context, info) => {
      return context.prisma.query.users({}, info)
    }
  },
  Mutation: {
    createDraft: (_, args, context, info) => {
      return context.prisma.mutation.createArticle(
        {
          data: {
            title: args.title,
            content: args.content,
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
      return context.prisma.mutation.updateArticle(
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
    deleteArticle: (_, args, context, info) => {
      return context.prisma.mutation.deleteArticle(
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
  typeDefs: path.join(__dirname, "schema.graphql"),
  resolvers,
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
