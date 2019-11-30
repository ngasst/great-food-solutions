const express = require("express");
const clientRouter = express.Router();
const { client } = require("../handlers");

// define client routes and their handlers
// LIST
clientRouter.get("/", client.list);
clientRouter.get("/:id", client.getOne);
clientRouter.post("/", client.create);
clientRouter.delete("/:id", client.remove);
clientRouter.put("/", client.put);

module.exports = {
    clientRouter
};
