const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const swagger = require("swagger-ui-express");
const swaggerDocs = require("./docs");
const globalErrorHandler = require("./controllers/error");
const AppError = require("./utils/appError");
const indexRouter = require("./routes");
const Visit = require("./models/Visit");

// Initialize express app
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/docs", swagger.serve, swagger.setup(swaggerDocs));

app.get("/", async (_, res) => {
    const visit = await Visit.findByIdAndUpdate(
        "600d6869db5d722e539c4b81",
        {
            $inc: {
                count: 1,
            },
        },
        { new: true }
    );

    res.send(
        `<head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IslomUchun.uz</title>
      </head>
      <body style="background-color: #571a90">
        <h1
          style="
            color: #9742e7;
            font-size: 8rem;
            text-align: center;
            font-family: sans-serif;
          "
        >
          Tez kunda...
        </h1>
        <h4
          style="
            color: #9742e7;
            font-size: 4rem;
            text-align: center;
            font-family: sans-serif;
          "
        >
          ${visit.count}
        </h4>
      </body>
    </html>
        `
    );
});

// handles all routes of /api route
indexRouter(app);

// 404 Error
app.all("*", (req, res, next) => {
    next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
