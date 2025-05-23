import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "pino-http";
import { createStream } from "rotating-file-stream";
import db from "./db_driver";
export const app = express();
import router from "./controllers";
import contributionRouter from "./controllers/contributionController.js";


app.use(cors());
app.use(morgan("dev"));
// app.use(logger());
app.use(express.json());

// create a rotating write stream
const accessLogStream = createStream("access.log", {
  interval: "1d", // rotate daily
  path: "./logs",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res, next) => {
  res.send("Express application is running. check /api for endpoints.");
});

app.use("/api", router);

if (import.meta.env.PROD) app.listen(3000);


import portfolio from "./models/portfolio.js";
import user from "./models/user.js";
const populatePortfolios = async () => {
  try {
    const usersWithoutPortfolio = await user.find({ portfolio: { $exists: false } });

    for (const user of usersWithoutPortfolio) {
      const portfolio2 = await portfolio.findOne({ user: user._id });
      if (portfolio2) {
        user.portfolio = portfolio2._id;
        await user.save();
      }
    }

    console.log("Portfolios populated successfully");
  } catch (error) {
    console.error("Error populating portfolios:", error);
  }
};

populatePortfolios();