const timesRouter = require("./times");
const tagsRouter = require("./tags");
const quizRouter = require("./quiz");
const bookRouter = require("./books");
const hadithRouter = require("./hadith");
const articleRouter = require("./articles");

module.exports = (app) => {
    app.use("/api/times", timesRouter);
    app.use("/api/quiz", quizRouter);
    app.use("/api/tags", tagsRouter);
    app.use("/api/books", bookRouter);
    app.use("/api/hadith", hadithRouter);
    app.use("/api/article", articleRouter);
};
