const { Bill } = require("../models");
const { dateIncrementor } = require("../utils");
const { format } = require("date-fns");

function list(req, res) {
    Bill.find({})
        .then(bills => {
            res.json({ ok: true, payload: bills });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function create(req, res) {
    if (!req.body.client) {
        res.json({
            ok: false,
            payload: "Must provide client id"
        });
        return;
    }
    if (!req.body.restaurant) {
        res.json({
            ok: false,
            payload: "Must provide restaurant id"
        });
        return;
    }
    if (
        !req.body.orders ||
        !Array.isArray(req.body.orders) ||
        !req.body.orders.length
    ) {
        res.json({
            ok: false,
            payload: "Must have an array of at least one order id"
        });
        return;
    }
    dateIncrementor(Bill, format(new Date(), "dd-MM-yy"), "number")
        .then(number => {
            const bill = new Bill({
                number,
                restaurant: req.body.restaurant,
                client: req.body.client,
                orders: req.body.orders
            });
            return bill.save();
        })
        .then(createdBill => {
            res.json({ ok: true, payload: createdBill });
        })

        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function getOne(req, res) {
    const id = req.params.id;
    Bill.findOne({ _id: id })
        .then(bill => {
            res.json({ ok: true, payload: bill });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

async function put(req, res) {
    const { client, restaurant, orders, id } = req.body;

    if (!client && !restaurant && !orders) {
        res.json({ ok: false, payload: "Nothing to update" });
        return;
    }

    const update = {};

    client && (update.client = client);
    restaurant && (update.restaurant = restaurant);

    if (orders) {
        const bill = await Bill.findOne({ _id: id });
        const existingOrders = bill.orders || [];
        let updatedOrders = [...orders, existingOrders];
        updatedOrders = updatedOrders.reduce((acc, curr) => {
            if (
                !acc.find(
                    elem => elem.order.toString() === curr.order.toString()
                )
            ) {
                acc.push(order);
            }
            return acc;
        }, []);
        update.orders = updatedOrders;
    }
    Bill.findOneAndUpdate({ _id: id }, update, { new: true })
        .then(updatedBill => {
            res.json({ ok: true, payload: updatedBill });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function remove(req, res, next) {
    const id = req.params.id;
    Bill.findOneAndDelete({ _id: id })
        .then(deletedBill => {
            if (!deletedBill) {
                res.json({ ok: false, payload: "ID provided does not exist" });
                return;
            }
            res.json({ ok: true, payload: null });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

module.exports = {
    list,
    create,
    getOne,
    put,
    remove
};
