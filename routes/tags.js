const express = require("express");
const router = express.Router();
const tags = require("../controllers/tag");

router.get("/", tags.getAll);
router.get("/:id", tags.get);
router.post("/", tags.create);
router.patch("/:id", tags.update);
router.delete("/:id", tags.delete);

module.exports = router;
