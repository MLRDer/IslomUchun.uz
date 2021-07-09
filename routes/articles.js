const express = require("express");
const router = express.Router();
const article = require("../controllers/article");

router.get("/", article.getAll);
router.get("/:id", article.get);
router.post("/", article.create);
router.patch("/:id", article.update);
router.delete("/:id", article.delete);

module.exports = router;
