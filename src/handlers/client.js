const { Client } = require("../models");

function list(req, res) {
    Client.find({})
        .then(clients => {
            res.json({ ok: true, payload: clients });
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
    const client = new Client({ name: name });
    client
        .save()
        .then(client => {
            res.json({ ok: true, payload: client });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

module.exports = {
    list,
    create
};