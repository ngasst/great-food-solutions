const { registerGlobalRoutes } = require("./global");
const { clientRouter } = require("./client");
const { orderRouter } = require("./order");
const { ingredientRouter } = require("./ingredient");
const { recipeRouter } = require("./recipe");
const { restaurantRouter } = require("./restaurant");
const { billRouter } = require("./bill");

function registerRoutes(app) {
    // register routes here
    // global routes
    registerGlobalRoutes(app);

    // entity routes
    app.use("/clients", clientRouter);
    app.use("/orders", orderRouter);
    app.use("/ingredients", ingredientRouter);
    app.use("/recipes", recipeRouter);
    app.use("/clients", clientRouter);
    app.use("/restaurants", restaurantRouter);
    app.use("/bills", billRouter);
}

module.exports = { registerRoutes };
