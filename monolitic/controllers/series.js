const Series = require("../models/series");

class SeriesController {
  static find(req, res, next) {
    Series.find()
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
    Series.findById(req.params.id)
      .then((result) => {
        if (result == undefined) {
          res.status(404).json({ message: "series not found" });
        } else {
          res.status(200).json(result);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }
  static create(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const newSeries = {
      title,
      overview,
      poster_path,
      popularity: Number(popularity),
      tags: tags.split(","),
    };

    Series.create(newSeries)
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
    const updateDataSeries = {
      title,
      overview,
      poster_path,
      popularity: Number(popularity),
      tags: tags.split(","),
    };

    Series.update(req.params.id, updateDataSeries)
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
    Series.delete(req.params.id)
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

module.exports = SeriesController;
