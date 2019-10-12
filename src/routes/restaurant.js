const express = require("express");
const restaurantRouter = express.Router();
const { restaurant } = require("../handlers");

// define client routes and their handlers
// LIST
restaurantRouter.get("/", restaurant.list);
restaurantRouter.post("/", restaurant.create);

module.exports = {
    restaurantRouter
};
