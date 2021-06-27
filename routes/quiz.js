const express = require("express");
const router = express.Router();
const quiz = require("../controllers/quiz");

router.get("/", quiz.getAll);
router.get("/:id", quiz.get);
router.post("/", quiz.create);
router.patch("/:id", quiz.update);
router.delete("/:id", quiz.delete);

module.exports = router;
