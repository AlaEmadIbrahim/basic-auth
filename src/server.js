"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./auth/router");
const notFoundHandler = require("./middleware/404");
const internalErrorHandler = require("./middleware/500");

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 
app.use(router);

app.use("*", notFoundHandler);
app.use(internalErrorHandler);

function start() {
  app.listen(port, () => {
    console.log(`Server Listening on PORT ${port}`);
  });
}

module.exports = {
  app,
  start,
};
