const Mutation = {
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

module.exports = Mutation
