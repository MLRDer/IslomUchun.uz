const timesRouter = require("./times");

module.exports = (app) => {
    app.use("/api/times", timesRouter);
};
