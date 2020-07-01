const router = require("express").Router();
const SeriesController = require("../controllers/series");

router.get("/tv", SeriesController.find);
router.get("/tv/:id", SeriesController.findById);
router.post("/tv/add", SeriesController.create);
router.put("/tv/:id/update", SeriesController.update);
router.delete("/tv/:id/delete", SeriesController.remove);

module.exports = router;
