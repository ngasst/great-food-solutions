const express = require("express");
const restaurantRouter = express.Router();
const { restaurant } = require("../handlers");

// define client routes and their handlers
// LIST

restaurantRouter.get("/", restaurant.list);
restaurantRouter.get("/clients/:id", restaurant.listByClient);
restaurantRouter.post("/", restaurant.create);
restaurantRouter.get("/:id", restaurant.getOne);
restaurantRouter.put("/", restaurant.put);
restaurantRouter.delete("/:id", restaurant.remove);

module.exports = {
    restaurantRouter
};
