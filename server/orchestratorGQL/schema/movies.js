const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3002/movies";
const urlTv = "http://localhost:3003/tv";

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type GetAll {
    movies: [Movie]
    tvSeries: [TvSeries]
  }

  input InputMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String!
  }

  type Query {
    getAll: GetAll
    movies: [Movie]
    movie(movieId: ID): Movie
  }

  type Mutation {
    addMovie(movie: InputMovie): Movie
    deleteMovie(movieId: ID): Movie
    updateMovie(movieId: ID, movie: InputMovie): Movie
  }
`;
const resolvers = {
  Query: {
    getAll: async () => {
      try {
        let GetAll = {};

        const movies = JSON.parse(await redis.get("movies"));
        if (movies) {
          GetAll.movies = movies;
        } else {
          const { data } = await axios({
            url: url,
            method: "get",
          });
          redis.set("movies", JSON.stringify(data));
          GetAll.movies = data;
        }
        const tv = JSON.parse(await redis.get("tv"));
        if (tv) {
          GetAll.tvSeries = tv;
        } else {
          const { data } = await axios({
            url: urlTv,
            method: "get",
          });
          redis.set("tv", JSON.stringify(data));
          GetAll.tvSeries = data;
        }
        return GetAll;
      } catch (error) {
        return error;
      }
    },
    movies: async () => {
      try {
        //redis.del("movies");
        const movies = JSON.parse(await redis.get("movies"));
        if (movies) {
          return movies;
        } else {
          const { data } = await axios({
            url: url,
            method: "get",
          });
          redis.set("movies", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        return error;
      }
    },
    movie: async (_, args) => {
      try {
        const { movieId } = args;
        const { data } = await axios({
          url: `${url}/${movieId}`,
          method: "get",
        });
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      const newMovie = args.movie;
      try {
        const { data } = await axios({
          url: `${url}/add`,
          method: "post",
          data: newMovie,
        });

        const movies = JSON.parse(await redis.get("movies"));
        // console.log(data);
        // console.log(movies);
        movies.push(data.ops[0]);
        redis.set("movies", JSON.stringify(movies));
        return data.ops[0];
      } catch (error) {
        return error;
      }
    },
    deleteMovie: async (_, args) => {
      const { movieId } = args;
      try {
        const { data } = await axios({
          url: `${url}/${movieId}/delete`,
          method: "delete",
        });
        const movies = JSON.parse(await redis.get("movies"));
        const newMovies = movies.filter((data) => data._id != movieId);
        redis.set("movies", JSON.stringify(newMovies));

        console.log(data);
        return data;
      } catch (error) {
        return error;
      }
    },
    updateMovie: async (_, args) => {
      const { movieId } = args;
      const dataMovie = args.movie;
      try {
        const { data } = await axios({
          url: `${url}/${movieId}/update`,
          method: "put",
          data: dataMovie,
        });
        const movies = JSON.parse(await redis.get("movies"));
        const dataById = await axios({
          url: `${url}/${movieId}`,
          method: "get",
        });
        //   console.log(dataById.data);
        if (movies) {
          const newMovies = movies.filter((data) => data._id != movieId);
          newMovies.push(dataById.data);
          redis.set("movies", JSON.stringify(newMovies));
        }
        console.log(data);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
