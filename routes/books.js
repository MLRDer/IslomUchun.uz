const express = require("express");
const router = express.Router();
const books = require("../controllers/book");

router.get("/", books.getAll);
router.get("/:id", books.get);
router.post("/", books.create);
router.patch("/:id", books.update);
router.delete("/:id", books.delete);

module.exports = router;
