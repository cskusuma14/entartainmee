const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3003/tv";

const typeDefs = gql`
  type TvSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input InputTvSerie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String!
  }

  extend type Query {
    tvSeries: [TvSerie]
    tvSerie(tvId: ID): TvSerie
  }

  extend type Mutation {
    addTvSerie(tvSerie: InputTvSerie): TvSerie
    deleteTvSerie(tvId: ID): TvSerie
    updateTvSerie(tvId: ID, tvSerie: InputTvSerie): TvSerie
  }
`;
const resolvers = {
  Query: {
    tvSeries: async () => {
      try {
        //redis.del("tv");
        const tvSeries = JSON.parse(await redis.get("tv"));
        if (tvSeries) {
          return tvSeries;
        } else {
          const { data } = await axios({
            url: url,
            method: "get",
          });
          redis.set("tv", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        return error;
      }
    },
    tvSerie: async (_, args) => {
      try {
        const { tvId } = args;
        const { data } = await axios({
          url: `${url}/${tvId}`,
          method: "get",
        });
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addTvSerie: async (_, args) => {
      const newTvSerie = args.tvSerie;
      try {
        const { data } = await axios({
          url: `${url}/add`,
          method: "post",
          data: newTvSerie,
        });

        const tvSeries = JSON.parse(await redis.get("tv"));
        // console.log(data);
        // console.log(movies);
        tvSeries.push(data.ops[0]);
        redis.set("tv", JSON.stringify(tvSeries));
        return data.ops[0];
      } catch (error) {
        return error;
      }
    },
    deleteTvSerie: async (_, args) => {
      const { tvId } = args;
      try {
        const { data } = await axios({
          url: `${url}/${tvId}/delete`,
          method: "delete",
        });
        const tvSeries = JSON.parse(await redis.get("tv"));
        const newTvSeries = tvSeries.filter((data) => data._id != tvId);
        redis.set("tv", JSON.stringify(newTvSeries));

        //console.log(data);
        return data;
      } catch (error) {
        return error;
      }
    },
    updateTvSerie: async (_, args) => {
      const { tvId } = args;
      const newTvSerie = args.tvSerie;
      try {
        const { data } = await axios({
          url: `${url}/${tvId}/update`,
          method: "put",
          data: newTvSerie,
        });
        const tvSeries = JSON.parse(await redis.get("tv"));
        const dataById = await axios({
          url: `${url}/${tvId}`,
          method: "get",
        });
        //   console.log(dataById.data);
        if (tvSeries) {
          const newTvSeries = tvSeries.filter((data) => data._id != tvId);
          newTvSeries.push(dataById.data);
          redis.set("tv", JSON.stringify(newTvSeries));
        }
        //console.log(data);
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
