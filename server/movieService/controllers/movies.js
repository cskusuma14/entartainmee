const Movies = require("../models/movies");

class MoviesController {
  static find(req, res, next) {
    Movies.find()
      .then((results) => {
        res.status(200).json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static findById(req, res, next) {
    Movies.findById(req.params.id)
      .then((result) => {
        if (result == undefined) {
          res.status(404).json({ message: "movie not found" });
        } else {
          res.status(200).json(result);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static create(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const newMovie = {
      title,
      overview,
      poster_path,
      popularity: Number(popularity),
      tags: tags.split(","),
    };

    Movies.create(newMovie)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static update(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const updateDataMovie = {
      title,
      overview,
      poster_path,
      popularity: Number(popularity),
      tags: tags.split(","),
    };

    Movies.update(req.params.id, updateDataMovie)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static remove(req, res, next) {
    Movies.delete(req.params.id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }
}

module.exports = MoviesController;
