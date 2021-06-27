const timesRouter = require("./times");
const tagsRouter = require("./tags");
const quizRouter = require("./quiz");

module.exports = (app) => {
    app.use("/api/times", timesRouter);
    app.use("/api/quiz", quizRouter);
    app.use("/api/tags", tagsRouter);
};
