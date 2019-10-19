const { registerGlobalRoutes } = require("./global");
const { clientRouter } = require("./client");
const { orderRouter } = require("./order");

function registerRoutes(app) {
    // register routes here
    // global routes
    registerGlobalRoutes(app);

    // entity routes
    app.use("/client", clientRouter);
    app.use("/order", orderRouter);
}

module.exports = { registerRoutes };
