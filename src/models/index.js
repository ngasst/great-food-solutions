const { Bill } = require("./bill");
const { Recipe } = require("./recipe");
const { Client } = require("./client");
const { Ingredient } = require("./ingredient");
const { Order } = require("./order");
const { Restaurant } = require("./restaurant");
const { testModels } = require("./test.models.js");

module.exports = {
    Bill,
    Recipe,
    Client,
    Ingredient,
    Order,
    Restaurant,
    testModels
};
