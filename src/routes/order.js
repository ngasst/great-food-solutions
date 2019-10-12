const express = require("express");
const orderRouter = express.Router();
const { order } = require("../handlers");

orderRouter.get("/", order.list);
orderRouter.post("/", order.create);
orderRouter.remove("/:id", order.remove);
