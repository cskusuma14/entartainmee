const router = require("express").Router();
const MoviesController = require("../controllers/movies");

router.get("/movies", MoviesController.find);
// router.get("/movies/:id", MoviesController.findById);
router.post("/movies/add", MoviesController.create);
router.put("/movies/:id/update", MoviesController.update);
router.delete("/movies/:id/delete", MoviesController.remove);

module.exports = router;
