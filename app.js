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
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <!-- Boxicons CSS -->
            <link
              href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
              rel="stylesheet"
            />
            <title>IslomUchun.uz</title>
        
            <style>
              h1 {
                color: #9742e7;
                font-size: 8rem;
                text-align: center;
                font-family: sans-serif;
              }
        
              h2 {
                color: #9742e7;
                font-size: 5rem;
                text-align: center;
                font-family: sans-serif;
              }
        
              .tg_group_text {
                opacity: 0;
                transition: all 0.3s;
              }
        
              .outlined_icon {
                display: flex;
                align-items: center;
                justify-content: center;
                display: inline-block;
                padding: 0.5rem;
                border-radius: 50%;
                background-color: #9742e7;
                cursor: pointer;
                box-shadow: "2px 3px 6px 0 #0000002";
                transition: all 0.3s;
              }
        
              .outlined_icon:hover {
                background-color: #8b2be4;
              }
        
              .outlined_icon:hover ~ .tg_group_text {
                opacity: 1;
              }
        
              h1,
              h2 {
                text-align: center;
              }
        
              @media (max-width: 700px) {
                h1 {
                  font-size: 4rem;
                }
        
                h2 {
                  font-size: 2rem;
                }
              }
            </style>
          </head>
          <body style="background-color: #571a90">
            <a class="outlined_icon" href="https://t.me/IslomUchun_official">
              <i class="bx bxl-telegram bx-sm" style="color: white"></i>
            </a>
            <h1 class="coming_soon">Tez kunda...</h1>
            <h2 class="tg_group_text">
              Telegram kanalga qo'shilish
              <i class="bx bxs-smile bx-lg" style="color: yellow"></i>
            </h2>
            ${visit.count}
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
