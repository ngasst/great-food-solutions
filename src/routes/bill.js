const express = require("express");
const billRouter = express.Router();
const { bill } = require("../handlers");

// define bill routes and their handlers
// LIST
billRouter.get("/", bill.list);
billRouter.post("/", bill.create);

module.exports = {
    billRouter
};
