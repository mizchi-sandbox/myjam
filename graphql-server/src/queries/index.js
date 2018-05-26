const Query = {
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
}

module.exports = Query
