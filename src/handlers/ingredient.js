const { Ingredient } = require('../models');

function list(req, res) {
    const ingredient = req.params.id;
    Ingredient.findById({_id: ingredient})
        .then(ingredients => {
            res.json({ ok: true, payload: ingredients });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        })
}

function create(req, res) {
    if(!req.body.name || typeof req.body.name !=="string") {
        res.json({
            ok: false,
            payload: 'Must provide a valid name !'
        });
        return;
    }
    const name = req.body.name;
    if(!Number(req.body.price)) {
        res.json({ 
            ok: false,
            payload: 'Must provide a valid price !'
        });
        return;
    }
    const price = req.body.price;
    const ingredient = new Ingredient({name, price});
    ingredient
        .save()
        .then(ingredient => {
            res.json({ ok: true, payload: ingredient });
        })
        .catch(err => {
            res.json({ok: false, payload: err.message || "FAILED" });
        })
};

function update(req, res) {
    const { name, price } = req.body;
    if (!name || !price || Object.keys(req.body).length <= 1) {
        res.json({ 
            ok: false,
            payload: 'All required fields are not provided !'
        });
        return;
    }
    if(typeof name !=="string") {
        res.json({ 
            ok: false,
            payload: 'Must provide a valid name !'
        });
        return;
    }
    if(!Number(price)) {
        res.json({ 
            ok: false,
            payload: 'Must provide a valid price !'
        });
        return;
    }
    const id = req.body.id;
    Ingredient.findOneAndUpdate({_id: id}, {name, price}, {new: true})
        .then(newDoc => {
            res.json({ ok: true, payload: newDoc });
        })
        .catch(err => {
            console.log(err);
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
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