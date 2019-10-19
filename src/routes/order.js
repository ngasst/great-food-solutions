const express = require("express");
const orderRouter = express.Router();
const { order } = require("../handlers");

orderRouter.get("/", order.list);
orderRouter.post("/", order.create);
orderRouter.delete("/:id", order.remove);
orderRouter.put("/", order.put);


module.exports = {
    orderRouter
};
