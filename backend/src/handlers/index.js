const client = require("./client");
const order = require("./order");
const ingredient = require("./ingredient");
const recipe = require("./recipe");
const restaurant = require("./restaurant");
const bill = require("./bill");
const user = require("./user");

module.exports = {
    order,
    client,
    ingredient,
    recipe,
    restaurant,
    bill,
    user
};
