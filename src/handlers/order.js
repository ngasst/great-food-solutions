const { Order } = require("../models");
const { ObjectID } = require("mongodb");
const { parseISO, isValid } = require("date-fns");

function list(req, res) {
    Order.find({})
        .then(orders => {
            res.json({ ok: true, payload: orders });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function create(req, res) {
    // make sure to checkout the schema to see what needs implemented!
    // simulate restaurant ID
    // TODO: Remove simulated ID later on
    const restaurant = new ObjectID().toHexString();
    const restaurant = new ObjectID().toHexString();
    const productionDay = parseISO(req.body.productionDay);
    if (!isValid(productionDay)) {
        res.json({
            ok: false,
            payload: 'Date format for "productionDay" is invalid!'
        });
    }
    const deliveryDay = parseISO(req.body.deliveryDay);
    if (!isValid(deliveryDay)) {
        res.json({
            ok: false,
            payload: 'Date format for "deliveryDay" is invalid!'
        });
    }

    const quantity = req.body.quantity;
    if (!Number(quantity)) {
        res.json({ ok: false, payload: '"quantity" should be a number!' });
    }
    const order = new Order({
        restaurant,
        productionDay,
        deliveryDay,
        quantity
    });
    order
        .save()
        .then(order => {
            res.json({ ok: true, payload: order });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function remove(req, res) {
    const order = req.params.id;
    Order.deleteOne({
        _id: order
    })
        .then(() => {
            res.json({ ok: true, payload: null });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function put(req, res) {
    const restaurant = new ObjectID().toHexString();
    const { deliveryDay, productionDay, quantity } = req.body;
    const order = req.body.id;
    if (
        !restaurant ||
        !deliveryDay ||
        !productionDay ||
        !quantity ||
        Object.keys(req.body).length <= 1
    ) {
        res.json({ ok: false, payload: "Nothing to update!" });
    }
    Order.findOneAndUpdate(
        {
            _id: order
        },
        { restaurant, deliveryDay, productionDay, quantity },
        { new: true }
    )
        .then(doc => {
            res.json({ ok: true, payload: doc });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

module.exports = {
    list,
    create,
    remove,
    put
};
