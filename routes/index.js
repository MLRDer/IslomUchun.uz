const timesRouter = require("./times");
const visit = require("../controllers/visit");

module.exports = (app) => {
    app.use("/api/times", timesRouter);
    app.get("/api/visit", visit.create);
};
