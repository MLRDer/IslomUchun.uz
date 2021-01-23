const main = require("./swagger.json");
const tags = require("./tags.json");

const timeRoutes = require("./routes/times.json");

const timeModels = require("./models/times.json");

const paths = {
    ...timeRoutes,
};

const definitions = {
    ...timeModels,
};

module.exports = {
    ...main,
    tags,
    definitions,
    paths,
    host: process.env.BASE_URL,
};
