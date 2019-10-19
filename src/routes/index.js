const { registerGlobalRoutes } = require("./global");
const { clientRouter } = require("./client");
const { orderRouter } = require("./order");
const { ingredientRouter } = require("./ingredient");
const { recipeRouter } = require("./recipe");
const { ingredientsRouter, ingredientRouter } = require("./ingredient");
const { recipesRouter, recipeRouter } = require("./recipe");

function registerRoutes(app) {
    // register routes here
    // global routes
    registerGlobalRoutes(app);

    // entity routes
    app.use("/client", clientRouter);
    app.use("/order", orderRouter);
    app.use("/ingredient", ingredientRouter);
    app.use("/ingredients", ingredientRouter);
    app.use("/ingredients", ingredientsRouter);
    app.use("/ingredient", ingredientRouter);
    app.use("/recipes", recipesRouter);
    app.use("/recipe", recipeRouter);
}

module.exports = { registerRoutes };
