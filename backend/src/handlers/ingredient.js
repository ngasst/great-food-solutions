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
    if (!req.body.category || typeof req.body.category !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid category !"
        });
        return;
    }
    if (!req.body.quantity || typeof req.body.quantity !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid quantity !"
        });
        return;
    }
    if (!req.body.price || typeof req.body.price !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid price !"
        });
        return;
    }
    if (!req.body.supplier || typeof req.body.supplier !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid supplier !"
        });
        return;
    }
    if (!req.body.brand || typeof req.body.brand !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid brand !"
        });
        return;
    }
    const { name, category, quantity, price, supplier, brand } = req.body;


    const ingredient = new Ingredient({
        name,
        category,
        quantity,
        price,
        supplier,
        brand
    });
    ingredient
        .save()
        .then(createdIngredient => {
            res.json({ ok: true, payload: createdIngredient });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function put(req, res) {
    const { id, name, category, quantity, price, supplier, brand } = req.body;
    if (!name && !category && !quantity && !price && !supplier && !brand) {
        res.json({
            ok: false,
            payload: "Nothing to update !"
        });
    }

    const update = {};

    name && (update.name = name);
    category && (update.category = category);
    quantity && (update.quantity = quantity);
    price && (update.price = price);
    supplier && (update.supplier = supplier);
    brand && (update.brand = brand);

    Ingredient.findOneAndUpdate({ _id: id }, { ...update }, { new: true })
        .then(ingredient => {
            res.json({ ok: true, payload: ingredient });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        })
}


function remove(req, res) {
    const id = req.params.id;
    Ingredient.findOneAndDelete({
        _id: id
    })
        .then((deletedIngredient) => {
            if (!deletedIngredient) {
                res.json({ ok: false, payload: "ID provided does not exist" });
                return;
            }
            res.json({ ok: true, payload: null });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function list(req, res) {
    const keys = req.query;
    if(Object.keys(keys).length>0) {
        Ingredient.find({ category: keys.category })
        .then(ingredients => {
            res.json({ ok: true, payload: ingredients });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
    } else {
        Ingredient.find({})
        .then(ingredients => {
            res.json({ ok: true, payload: ingredients });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
    }
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
        if (!doc.name || !doc.category || !doc.quantity || !doc.price || !doc.supplier || !doc.brand) {
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
        if (!doc.category || typeof doc.category !== "string") {
            res.json({
                ok: false,
                payload: "Must provide a valid category !"
            });
            return;
        }
        if (!doc.quantity || typeof doc.quantity !== "string") {
            res.json({
                ok: false,
                payload: "Must provide a valid quantity !"
            });
            return;
        }
        if (!doc.price || typeof doc.price !== "string") {
            res.json({
                ok: false,
                payload: "Must provide a valid price !"
            });
            return;
        }
        if (!doc.supplier || typeof doc.supplier !== "string") {
            res.json({
                ok: false,
                payload: "Must provide a valid supplier !"
            });
            return;
        }
        if (!doc.brand || typeof doc.brand !== "string") {
            res.json({
                ok: false,
                payload: "Must provide a valid brand !"
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
    getOne,
    list,
    create,
    put,
    remove,
    createMultiple
};
