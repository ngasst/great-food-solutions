const { Bill } = require("../models");
const { dateIncrementor } = require("../utils");
const { format } = require("date-fns")

function list(req, res) {
    Bill.find({})
        .then(bill => {
            res.json({ ok: true, payload: bill });
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

function update(req, res) {
    Bill.update({})
        .then(bill => {
            res.json({ ok: true, payload: bill });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}



module.exports = {
    list,
    create,
    read,
    update,
    delete
};
