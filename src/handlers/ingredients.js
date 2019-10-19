const { Ingredient } = require('../models');

function list(req, res) {
    Ingredient.find({})
        .then(ingredients => {
            res.json({ ok: true, payload: ingredients });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        })
}

function create(req, res) {
    const payload = req.body;
    for (const doc of payload) {
        if (!doc.name || !doc.price || Object.keys(req.body).length <= 1) {
            res.json({ 
                ok: false,
                payload: 'All required fields are not provided !'
            });
            return;
        }
        if(!doc.name || typeof doc.name !=="string") {
            res.json({
                ok: false,
                payload: 'Must provide a valid name !'
            });
            return;
        }
        if(!Number(doc.price)) {
            res.json({ 
                ok: false,
                payload: 'Must provide a valid price !'
            });
            return;
        }
    }
    Ingredient
        .insertMany(payload)
        .then(ingredients => {
            res.json({ ok: true, payload: ingredients });
        })
        .catch(err => {
            res.json({ok: false, payload: err.message || "FAILED" });
        })
};

module.exports = {
    list,
    create
}