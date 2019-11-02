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
        return;
    }
    const name = req.body.name;
    const client = new Client({ name }); // when key name is equal to the name of the variable containing
    // the value, we can use this shorthand of only writing the one label.
    client
        .save()
        .then(client => {
            res.json({ ok: true, payload: client });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function remove(req, res) {
    const id = req.params.id;
    Client.deleteOne({
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
    const id = req.body.id;
    const { name } = req.body;
    if (!name || Object.keys(req.body).length < 1) {
        res.json({ ok: false, payload: "Nothing to update!" });
        return;
    }
    Client.findOneAndUpdate(
        {
            _id: id
        },
        { name },
        { new: true }
    )
        .then(updatedDoc => {
            res.json({ ok: true, payload: updatedDoc });
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
