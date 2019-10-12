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
            payload: 'Must provide an object like: {name: "string", price: [number]}'
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

function update(req, res) {
    if(!req.body.newValue || typeof req.body.newValue !=="string" || !req.body.name || typeof req.body.name !=="string") {
        res.json({ 
            ok: false,
            payload: 'Must provide an object like: {name: "string", newValue: "string"}'
        });
    } else {
        const name = req.body.name;
        const newValue = req.body.newValue;
        Ingredient.findOne({name})
            .then( doc => {
                if(doc) {
                    return Ingredient.findOneAndUpdate( {_id:`${doc._id}`}, {$set: {name: `${newValue}`}}, {new: true} )
                } else {
                    return false;
                }
            })
            .then(newDoc => {
                if(!newDoc) {
                    res.json({ ok: false, payload: `The ingredient "${name}" does not exist ! Pleas provide an existing name of ingredient.`})
                } else {
                res.json({ ok: true, payload: newDoc });
                }
            })
            .catch(err => {
                console.log(err);
                res.json({ ok: false, payload: err.message || "FAILED" });
            });
    }
}

function erise(req, res) {
    if(!req.body.name || typeof req.body.name !=="string") {
        res.json({ 
            ok: false,
            payload: 'Must provide an object like: {name: "string"}'
        });
    } else {
        const name = req.body.name;
        Ingredient.findOne({name})
        .then(doc => {
            if(doc) {
                Ingredient.findOneAndRemove( {_id:`${doc._id}`});
                res.json({ ok: true, payload: `The ingredient "${name} has been successfully deleted.` });
            } else {
                res.json({ ok: false, payload: `The ingredient "${name}" does not exist ! Pleas provide an existing name of ingredient.` });
            }
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        })
    }
}

module.exports = {
    list,
    create,
    update,
    erise
}