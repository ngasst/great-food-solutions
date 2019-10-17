const { Bill } = require("../models");
const { dateIncrementor } = require("../utils");
const { format } = require("date-fns")

function list(req, res) {
    Restaurant.find({})
        .then(Restaurant => {
            res.json({ ok: true, payload: Restaurant });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function create(req, res) {
    if (!req.body.restaurantId) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {"name: XXX"}'
        });
    }
    if (!req.body.clientID) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {"name : XXX"}'
        });
    }
    if (!req.body.orders) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {"name"}'
        });
    }
    dateIncrementor(bill, format(new Date(), "DD-MM-YY"), "number").then(number => {
        const bill = new Bill({ number: number });
        return bill
            .save()

    })
        .then(bill => {
            res.json({ ok: true, payload: bill });
        })

        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function read(req, res) {
    Bill.read({})
        .then(bill => {
            res.json({ ok: true, payload: bill });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function put(req, res) {
    Bill.put({})
        .then(bill => {
            res.json({ ok: true, payload: bill });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function update(req, res, next) {
    const bill = req.dbbill;
    Object.assign(bill, req.body);

    bill.save()
        .then((savedUser) => res.sendStatus(204),
            (e) => next(e));
}

function remove(req, res, next) {
    const bill = req.dbbill;
    user.remove()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}



module.exports = {
    list,
    create,
    read,
    put,
    update,
    remove
};
