"use strict";

const bcrypt = require("bcrypt");
const express = require("express");
const userRouter = express.Router();
const { Users } = require("../auth/models/index");
const basicAuthentication = require("../auth/middleware/basic");

userRouter.get("/", home);
userRouter.post("/signup", signUp);

userRouter.post("/signin", basicAuthentication(Users), signIn);


function home(req, res) {
  res.status(200).send("Authentication");
}

async function signUp(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 6);
    const record = await Users.create(req.body);
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send("Error " + e);
  }
}

function signIn(req, res) {
  res.status(200).json(req.user);
}

module.exports = userRouter;
