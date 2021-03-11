const main = require("./swagger.json");
const tags = require("./tags.json");

const timeRoutes = require("./routes/times.json");
const quizRoutes = require("./routes/quizzes.json");

const timeModels = require("./models/times.json");
const quizModels = require("./models/quiz.json");

const paths = {
    ...timeRoutes,
    ...quizRoutes,
};

const definitions = {
    ...timeModels,
    ...quizModels,
};

module.exports = {
    ...main,
    tags,
    definitions,
    paths,
    host: process.env.BASE_URL,
};
