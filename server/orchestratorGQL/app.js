const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const movieSchema = require("./schema/movies");
const tvSerieSchema = require("./schema/tvSeries");

const schema = makeExecutableSchema({
  typeDefs: [movieSchema.typeDefs, tvSerieSchema.typeDefs],
  resolvers: [movieSchema.resolvers, tvSerieSchema.resolvers],
});

const server = new ApolloServer({
  schema,
});

server.listen(3001).then(({ url }) => {
  console.log(`server ready at ${url}`);
});
