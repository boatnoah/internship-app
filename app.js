const createError = require("http-errors");
const express = require("express");
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import catalog from "./routes/catalog.js";

import mongoose from "mongoose"; // Database setup
import { uri } from "./config.js";
import { scheduleUpdate } from "./public/javascripts/scheduleUpdate.js";

const app = express();

mongoose.set("strictQuery", false);
const mongoDB = uri;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

app.use("/", indexRouter);
app.use("/catalog", catalog);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

scheduleUpdate();

export default app;
