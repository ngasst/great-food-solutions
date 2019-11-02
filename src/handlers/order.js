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
    // make sure to checkout the schema to see what needs implementing!
    const productionDay = parseISO(req.body.productionDay);
    if (!isValid(productionDay)) {
        res.json({
            ok: false,
            payload: 'Date format for "productionDay" is invalid!'
        });
        return;
    }
    const deliveryDay = parseISO(req.body.deliveryDay);
    if (!isValid(deliveryDay)) {
        res.json({
            ok: false,
            payload: 'Date format for "deliveryDay" is invalid!'
        });
        return;
    }

    const quantity = req.body.quantity;
    if (!Number(quantity)) {
        res.json({ ok: false, payload: '"quantity" should be a number!' });
        return;
    }

    const restaurant = req.body.restaurant;
    if (!Number(restaurant)) {
        res.json({ ok: false, payload: '"restaurant" should be a number!' });
        return;
    }

    const order = new Order({
        restaurant,
        productionDay,
        deliveryDay,
        quantity
    }); // since we made sure that our variables were named the same as the keys of the object,
    // we can replace {keyName: keyName} by {keyName}
    order
        .save()
        .then(createdDoc => {
            res.json({ ok: true, payload: createdDoc });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function remove(req, res) {
    const id = req.params.id;
    Order.deleteOne({
        _id: id
    })
        .then(() => {
            res.json({ ok: true, payload: null });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function put(req, res) {
    const { deliveryDay, productionDay, quantity, restaurant } = req.body;
    const id = req.body.id;
    if (!restaurant && !deliveryDay && !productionDay && !quantity) {
        res.json({ ok: false, payload: "Nothing to update!" });
        return;
    }

    const update = {};

    restaurant && (update.restaurant = restaurant);
    deliveryDay && (update.deliveryDay = deliveryDay);
    productionDay && (update.productionDay = productionDay);
    (quantity || Number(quantity) === 0) && (update.quantity = quantity);

    Order.findOneAndUpdate(
        {
            _id: id
        },
        { ...update },
        { new: true }
    ) // eauivalent to findOneAndUpdate({_id: id}, update, {new: true})
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
