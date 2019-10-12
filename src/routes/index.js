const { registerGlobalRoutes } = require("./global");
const { clientRouter } = require("./client");

function registerRoutes(app) {
    // register routes here
    // global routes
    registerGlobalRoutes(app);

    // entity routes
    app.use("/client", clientRouter);
}

module.exports = { registerRoutes };
