const { Ingredient } = require("../models");

function getOne(req, res) {
    const id = req.params.id;
    Ingredient.findOne({ _id: id })
        .then(ingredient => {
            res.json({ ok: true, payload: ingredient });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function create(req, res) {
    if (!req.body.name || typeof req.body.name !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid name !"
        });
        return;
    }
    const name = req.body.name;
    if (!Number(req.body.price)) {
        res.json({
            ok: false,
            payload: "Must provide a valid price !"
        });
        return;
    }
    const price = req.body.price;
    const ingredient = new Ingredient({ name, price });
    ingredient
        .save()
        .then(ingredient => {
            res.json({ ok: true, payload: ingredient });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function update(req, res) {
    const { name, price } = req.body;
    if (!name && !price) {
        res.json({
            ok: false,
            payload: "Nothing to update !"
        });
        return;
    }
    if (name && typeof name !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid name !"
        });
        return;
    }
    if (price && !Number(price)) {
        res.json({
            ok: false,
            payload: "Must provide a valid price !"
        });
        return;
    }
    const id = req.body.id;
    const update = {};
    name && (update.name = name);
    price && (update.price = price);
    Ingredient.findOneAndUpdate({ _id: id }, { ...update }, { new: true })
        .then(updatedDoc => {
            res.json({ ok: true, payload: updatedDoc });
        })
        .catch(err => {
            console.log(err);
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function remove(req, res) {
    if (!req.params.id || typeof req.params.id !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid payload !"
        });
    } else {
        const id = req.params.id;
        Ingredient.findOneAndDelete({ _id: id })
            .then(() => {
                res.json({ ok: true, payload: null });
            })
            .catch(err => {
                res.json({ ok: false, payload: err.message || "FAILED" });
            });
    }
}

function list(req, res) {
    Ingredient.find({})
        .then(ingredients => {
            res.json({ ok: true, payload: ingredients });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function createMultiple(req, res) {
    const payload = req.body;
    if (!Array.isArray(payload)) {
        res.json({
            ok: false,
            payload:
                "Please provide an array of recipes for a bulk recipe creation!"
        });
        return;
    }

    for (const doc of payload) {
        if (!doc.name || !doc.price) {
            res.json({
                ok: false,
                payload: "All required fields are not provided !"
            });
            return;
        }
        if (!doc.name || typeof doc.name !== "string") {
            res.json({
                ok: false,
                payload: "Must provide a valid name !"
            });
            return;
        }
        if (!Number(doc.price)) {
            res.json({
                ok: false,
                payload: "Must provide a valid price !"
            });
            return;
        }
    }
    Ingredient.insertMany(payload)
        .then(ingredients => {
            res.json({ ok: true, payload: ingredients });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

module.exports = {
    list,
    create,
    update,
    remove,
    getOne,
    createMultiple
};
