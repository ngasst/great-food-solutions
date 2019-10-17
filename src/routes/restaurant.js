const express = require("express");
const restaurantRouter = express.Router();
const { restaurant } = require("../handlers");

// define client routes and their handlers
// LIST
module.exports = function (app) {
const restaurantRouter = require('../handlers/restaurant');

app.route('./restaurant')
    .get(restaurantRouter.list)
    .post(restaurantRouter.create);

app.route('./restaurant/:restaurantId')
    .get(restaurantRouter.read)
    .put(restaurantRouter.update)
    .delete(restaurantRouter.remove);
}