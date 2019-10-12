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

module.exports = {
    list,
    create
};