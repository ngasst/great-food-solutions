const express = require("express");
const billRouter = express.Router();
const { bill } = require("../handlers");

billRouter.get("/", bill.list);
billRouter.post("/", bill.create);
billRouter.get("/:id", bill.getOne);
billRouter.put("/", bill.put);
billRouter.delete("/:id", bill.remove);

module.exports = {
    billRouter
};
