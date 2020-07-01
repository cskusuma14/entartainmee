import ApolloClient from "apollo-boost";
import { GET_FAVORITES } from "../pages/Favorites";

const client = new ApolloClient({
  uri: "http://localhost:3001",
  clientState: {
    resolvers: {
      Mutation: {
        addToFavorites: (_, variables, client) => {
          //console.log(variables);
          let { favorites } = client.cache.readQuery({ query: GET_FAVORITES });
          const newFavorite = {
            _id: variables.movie._id,
            overview: variables.movie.overview,
            tags: variables.movie.tags,
            title: variables.movie.title,
            poster_path: variables.movie.poster_path,
            popularity: variables.movie.popularity,
            __typename: "favorites",
          };
          favorites = [...favorites, newFavorite];
          client.cache.writeData({
            data: {
              favorites,
            },
          });
        },
      },
    },
    defaults: {
      favorites: [],
    },
  },
});

export default client;
