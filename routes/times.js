const express = require("express");
const router = express.Router();
const times = require("../controllers/times");

router.get("/", times.getAll);
router.get("/:id", times.get);
router.post("/", times.create);
router.patch("/:id", times.update);
router.delete("/:id", times.delete);

module.exports = router;
