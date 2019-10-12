const { Bill } = require("../models");

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
    if (!req.body.number) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {number: "day/month/year/num"}'
        });
    }
    const number = req.body.number;
    const bill = new Bill({ number: number });
    bill
        .save()
        .then(client => {
            res.json({ ok: true, payload: bill });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

module.exports = {
    list,
    create
};
