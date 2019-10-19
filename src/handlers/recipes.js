const { Recipe } = require('../models');

function list(req, res) {
    Recipe.find({})
        .then(recipe => {
            res.json({ ok: true, payload: recipe });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        })
}

function create(req, res) {
    const payload = req.body;
    for (const doc of payload) {
        if(!doc.name || !doc.baseUnit || !doc.instructions || !doc.ingredients || !doc.client || Object.keys(doc).length <= 1) {
            res.json({
                ok: false,
                payload: 'All required fields are not provided !'
            });
            return;
        }
        if(typeof doc.name !=="string") {
            res.json({
                ok: false,
                payload: 'Must provide a valid name !'
            });
            return;
        }
        if(doc.baseUnit !=="kg" && doc.baseUnit !=="l") {
            res.json({
                ok: false,
                payload: 'The base unit must be eather "kg" or "l" !'
            });
            return;
        }
    }
    Recipe
        .insertMany(payload)
        .then(recipes => {
            res.json({ ok: true, payload: recipes });
        })
        .catch(err => {
            res.json({ok: false, payload: err.message || "FAILED" });
        })
};

module.exports = {
    list,
    create
}