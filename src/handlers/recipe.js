const { Recipe } = require('../models');

function list(req, res) {
    const recipe = req.params.id;
    Recipe.find({_id: recipe})
        .then(recipe => {
            res.json({ ok: true, payload: recipe });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        })
}

function create(req, res) {
    const { name, baseUnit, instructions, ingredients, client } = req.body;
    if(!name || !baseUnit || !instructions || !ingredients || !client || Object.keys(req.body).length <= 1) {
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
    if(baseUnit !=="kg" && baseUnit !=="l") {
        res.json({
            ok: false,
            payload: 'The base unit must be eather "kg" or "l" !'
        });
        return;
    }
    const recipe = new Recipe({name, baseUnit, instructions, ingredients, client});
    recipe
        .save()
        .then(recipe => {
            res.json({ ok: true, payload: recipe });
        })
        .catch(err => {
            res.json({ok: false, payload: err.message || "FAILED" });
        })
};

function update(req, res) {
    const { name, baseUnit, instructions, ingredients, client } = req.body;
    if (!name || !baseUnit || !instructions || !ingredients || !client || Object.keys(req.body).length <= 1) {
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
    if(baseUnit !=="kg" && baseUnit !=="l") {
        res.json({
            ok: false,
            payload: 'The base unit must be eather "kg" or "l" !'
        });
        return;
    }
    const id = req.body.id;
    Recipe.findOneAndUpdate({_id: id}, {name, baseUnit, instructions, ingredients, client}, {new: true})
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
        Recipe.findOneAndDelete( {_id: id} )
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