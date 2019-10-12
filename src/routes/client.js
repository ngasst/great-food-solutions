const express = require("express");
const clientRouter = express.Router();
const { client } = require("../handlers");

// define client routes and their handlers
// LIST
clientRouter.get("/", client.list);
clientRouter.post("/", client.create);

module.exports = {
    clientRouter
};
