const { Restaurant } = require("../models");

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
    if (!req.body.name) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {name: "xxxx"}'
        });
    }
    const name = req.body.name;
    const restaurant = new Restaurant({ name: name });
    restaurant
        .save()
        .then(restaurant => {
            res.json({ ok: true, payload: restaurant });
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
    const bill = req.dbUser;
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