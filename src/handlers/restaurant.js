const { Restaurant } = require("../models");

function list(req, res) {
    Restaurant.find({})
        .then(restaurants => {
            res.json({ ok: true, payload: restaurants });
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
        return;
    }
    if (!req.body.street) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {street: "xxxx"}'
        });
        return;
    }
    if (!req.body.city) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {city: "xxxx"}'
        });
        return;
    }
    if (!req.body.zipCode) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {zipCode: "4 numbers"}'
        });
        return;
    }
    if (!req.body.client) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {clientId: "xxxx"}'
        });
        return;
    }
    const { name, street, city, zipCode, client } = req.body;

    const restaurant = new Restaurant({
        name,
        street,
        city,
        zipCode,
        client
    });
    restaurant
        .save()
        .then(createdRestaurant => {
            res.json({ ok: true, payload: createdRestaurant });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function getOne(req, res) {
    const id = req.params.id;
    Restaurant.findONe({ _id: id })
        .then(restaurant => {
            res.json({ ok: true, payload: restaurant });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function put(req, res) {
    const { name, street, city, zipCode, client, id } = req.body;
    if (!name && !street && !city && !zipCode && !client) {
        res.json({ ok: false, payload: "Nothing to update!" });
    }

    const update = {};

    name && (update.name = name);
    street && (update.street = street);
    city && (update.city = city);
    zipCode && (update.zipCode = zipCode);
    client && (update.client = client);

    Restaurant.findOneAndUpdate({ _id: id }, { ...update }, { new: true })
        .then(restaurant => {
            res.json({ ok: true, payload: restaurant });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function remove(req, res) {
    const id = req.params.id;
    Restaurant.findOneAndDelete({
        _id: id
    })
        .then(() => {
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
