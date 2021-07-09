const express = require("express");
const router = express.Router();
const hadith = require("../controllers/hadith");

router.get("/", hadith.getAll);
router.get("/:id", hadith.get);
router.post("/", hadith.create);
router.patch("/:id", hadith.update);
router.delete("/:id", hadith.delete);

module.exports = router;
