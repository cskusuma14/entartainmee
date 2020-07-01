const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3002/movies";

class MoviesController {
  static async find(req, res, next) {
    // axios({
    //   url: "http://localhost:3002/movies",
    //   method: "GET",
    // })
    //   .then(({ data }) => {
    //     res.status(200).json(data);
    //   })
    //   .catch((err) => {
    //     res.send(err);
    //   });
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        //kalau students ada di cache
        res.status(200).json(movies);
      } else {
        //kalau gak ada
        //ngambil ke service
        const { data } = await axios({
          url: url,
          method: "get",
        });
        res.status(200).json(data);

        //daftarkan data ke cache
        redis.set("movies", JSON.stringify(data));
      }
    } catch (error) {
      res.send(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { data } = await axios({
        url: `${url}/add`,
        method: "post",
        data: req.body,
      });
      res.status(201).json(data);

      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        movies.push(data.ops[0]);
        redis.set("movies", JSON.stringify(movies));
      }
    } catch (error) {
      res.send(error);
    }
  }
  static async remove(req, res, next) {
    try {
      const { data } = await axios({
        url: `${url}/${req.params.id}/delete`,
        method: "delete",
      });
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const newMovies = movies.filter((data) => data._id != req.params.id);
        redis.set("movies", JSON.stringify(newMovies));
      }
      res.status(200).json(data);
    } catch (error) {
      res.send(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { data } = await axios({
        url: `${url}/${req.params.id}/update`,
        method: "put",
        data: req.body,
      });
      const movies = JSON.parse(await redis.get("movies"));
      const dataById = await axios({
        url: `${url}/${req.params.id}`,
        method: "get",
      });
      //   console.log(dataById.data);
      if (movies) {
        const newMovies = movies.filter((data) => data._id != req.params.id);
        newMovies.push(dataById.data);
        redis.set("movies", JSON.stringify(newMovies));
      }
      res.status(200).json(data);
    } catch (error) {
      res.send(error);
    }
  }
}
module.exports = MoviesController;
