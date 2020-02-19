const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => {
            return links.filter(link => link.id == args.id)[0]
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const link = links.find(link => link.id == args.id)
            if (!link) {
                return
            }
            link.description = args.description
            link.url = args.url
            return link
        },
        deleteLink: (parent, args) => {
            let index = null
            let link = null
            links.forEach((link, i) => {
                if (link.id == args.id) {
                    index = i
                }
            })

            if (index != null) {
                link = links[index]
                links.splice(index, 1)
                return link
            }
            return
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))