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

function update(req, res) {
    if(!req.body._id || typeof req.body._id !=="string" || !req.body.newValue || typeof req.body.newValue !=="string") {
        res.json({ 
            ok: false,
            payload: 'Must provide a valid payload !'
        });
    } else {
        const id = req.body._id;
        const newValue = req.body.newValue;
        Ingredient.findOne({_id: id})
            .then( doc => {
                if(doc) {
                    return Ingredient.findByIdAndUpdate( {_id: id}, {$set: {name: newValue}}, {new: true} )
                } else {
                    return false;
                }
            })
            .then(newDoc => {
                if(!newDoc) {
                    res.json({ ok: false, payload: `There is no ingredient found with id: "${id}" ! Please provide a valid ingredient's id.`})
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
    update,
    remove
}