const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const warehouserRouter = require('./src/Routes/warehouseRoutes');
const beverageRouter = require('./src/Routes/beverageRoutes');
const errorHandler = require("./src/Middleware/errorHandler");
const { client } = require("./src/config/eurekaClient");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

const DB = mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT, DB, () => {
  console.log("Connected to DB");
  console.log("Server listening on port " + process.env.PORT);
  client.start();
});

app.use("/api/warehouse", warehouserRouter);
app.use("/api/warehouse/beverage", beverageRouter);
app.all("*", (req, res, next) => {
  const err = new Error();
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);
