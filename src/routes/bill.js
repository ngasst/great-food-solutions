const express = require("express");
const billRouter = express.Router();

// define bill routes and their handlers
// LIST

module.exports = function (app) {
    const billRouter = require('../handlers/bill');

    app.route('./bill')
        .get(billRouter.list)
        .post(billRouter.create);

    app.route('./bill/:billId')
        .get(billRouter.read)
        .put(billRouter.update)
        .delete(billRouter.delete);
}
