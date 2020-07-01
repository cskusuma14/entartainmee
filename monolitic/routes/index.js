const router = require("express").Router();
const MoviesController = require("../controllers/movies");
const SeriesController = require("../controllers/series");

router.get("/movies", MoviesController.find);
router.get("/movies/:id", MoviesController.findById);
router.post("/movies", MoviesController.create);
router.put("/movies/:id", MoviesController.update);
router.delete("/movies/:id", MoviesController.remove);

router.get("/series", SeriesController.find);
router.get("/series/:id", SeriesController.findById);
router.post("/series", SeriesController.create);
router.put("/series/:id", SeriesController.update);
router.delete("/series/:id", SeriesController.remove);

module.exports = router;
