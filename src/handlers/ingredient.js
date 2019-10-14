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
    if(!req.body.name || !req.body.price || typeof req.body.name !=="string" || typeof req.body.price !=="number") {
        res.json({
            ok: false,
            payload: 'Must provide a valid payload !'
        });
    } else {
        const name = req.body.name;
        const price = req.body.price;
        const ingredient = new Ingredient({ name: name, price: price });
        ingredient
            .save()
            .then(ingredient => {
                res.json({ ok: true, payload: ingredient });
            })
            .catch(err => {
                res.json({ok: false, payload: err || "FAILED" });
            })
    }
}

function patch(req, res) {
    if(!req.body.id || typeof req.body.id !=="string" || !req.body.newName || typeof req.body.newName !=="string" || typeof req.body.newPrice !=="number") {
        res.json({ 
            ok: false,
            payload: 'Must provide a valid payload !'
        });
    } else {
        const id = req.body.id;
        const newName = req.body.newName;
        const newPrice = req.body.newPrice;
        Ingredient.findOneAndReplace({_id: id}, {name: newName, price: newPrice}, {new: true})
            .then(newDoc => {
                res.json({ ok: true, payload: newDoc });
            })
            .catch(err => {
                console.log(err);
                res.json({ ok: false, payload: err.message || "FAILED" });
            });
    }
}

function remove(req, res) {
    if(!req.params.id || typeof req.params.id !=="string") {
        res.json({ 
            ok: false,
            payload: 'Must provide a valid payload !'
        });
    } else {
        const id = req.params.id;
        Ingredient.findOneAndDelete( {_id: id} )
        .then(deleted => {
            res.json(deleted);
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        })
    }
}

module.exports = {
    list,
    create,
    patch,
    remove
}