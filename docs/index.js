const main = require("./swagger.json");
const tags = require("./tags.json");

const timeRoutes = require("./routes/times.json");
const quizRoutes = require("./routes/quizzes.json");
const tagRoutes = require("./routes/tags.json");

const timeModels = require("./models/times.json");
const quizModels = require("./models/quiz.json");
const tagModels = require("./models/tag.json");

const paths = {
    ...timeRoutes,
    ...quizRoutes,
    ...tagRoutes,
};

const definitions = {
    ...timeModels,
    ...quizModels,
    ...tagModels,
};

module.exports = {
    ...main,
    tags,
    definitions,
    paths,
    host: process.env.BASE_URL,
};
