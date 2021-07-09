const main = require("./swagger.json");
const tags = require("./tags.json");

const timeRoutes = require("./routes/times.json");
const quizRoutes = require("./routes/quizzes.json");
const tagRoutes = require("./routes/tags.json");
const bookRoutes = require("./routes/books.json");
const hadithRoutes = require("./routes/hadiths.json");
const articleRoutes = require("./routes/articles.json");

const timeModels = require("./models/times.json");
const quizModels = require("./models/quiz.json");
const tagModels = require("./models/tag.json");
const bookModels = require("./models/book.json");
const hadithModels = require("./models/hadith.json");
const articleModels = require("./models/article.json");

const paths = {
    ...timeRoutes,
    ...quizRoutes,
    ...tagRoutes,
    ...bookRoutes,
    ...hadithRoutes,
    ...articleRoutes,
};

const definitions = {
    ...timeModels,
    ...quizModels,
    ...tagModels,
    ...bookModels,
    ...hadithModels,
    ...articleModels,
};

module.exports = {
    ...main,
    tags,
    definitions,
    paths,
    host: process.env.BASE_URL,
};
