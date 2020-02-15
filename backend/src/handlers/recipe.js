const { Recipe } = require("../models");

function getOne(req, res) {
    const id = req.params.id;
    Recipe.findOne({ _id: id })
        .then(recipe => {
            res.json({ ok: true, payload: recipe });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function create(req, res) {
    const { name, baseUnit, instructions, ingredients, client } = req.body;
    if (
        !name ||
        !baseUnit ||
        !instructions ||
        !ingredients ||
        !client ||
        Object.keys(req.body).length < 5
    ) {
        res.json({
            ok: false,
            payload: "All required fields are not provided !"
        });
        return;
    }
    if (typeof name !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid name !"
        });
        return;
    }
    if (baseUnit !== "kg" && baseUnit !== "l") {
        res.json({
            ok: false,
            payload: 'The base unit must be eather "kg" or "l" !'
        });
        return;
    }
    const recipe = new Recipe({
        name,
        baseUnit,
        instructions,
        ingredients,
        client
    });
    recipe
        .save()
        .then(recipe => {
            res.json({ ok: true, payload: recipe });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

async function update(req, res) {
    const { name, baseUnit, instructions, ingredients, client } = req.body;
    if (!name && !baseUnit && !instructions && !ingredients && !client) {
        res.json({
            ok: false,
            payload: "Nothing to update!"
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
    if (baseUnit && baseUnit !== "kg" && baseUnit !== "l") {
        res.json({
            ok: false,
            payload: 'The base unit must be eather "kg" or "l" !'
        });
        return;
    }
    const id = req.body.id;

    const update = {};

    name && (update.name = name);
    baseUnit && (update.baseUnit = baseUnit);
    ingredients && (update.ingredients = ingredients);
    client && (update.client = client);
    instructions && (update.instructions = instructions);

    Recipe.findOneAndUpdate({ _id: id }, { ...update }, { new: true })
        .then(updatedDoc => {
            res.json({ ok: true, payload: updatedDoc });
        })
        .catch(err => {
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
        Recipe.findOneAndDelete({ _id: id })
            .then(deletedRecipe => {
                if (!deletedRecipe) {
                    res.json({
                        ok: false,
                        payload: "ID provided does not exist"
                    });
                    return;
                }
                res.json({ ok: true, payload: null });
            })
            .catch(err => {
                res.json({ ok: false, payload: err.message || "FAILED" });
            });
    }
}

function list(req, res) {
    Recipe.find({})
        .populate("client")
        .populate("ingredients")
        .then(recipes => {
            res.json({ ok: true, payload: recipes });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function listByClient(req, res) {
    const clientID = req.params.id
    Recipe.find({client: clientID})
        .populate("client")
        .populate("ingredients.ingredient")
        .then(recipes => {
            res.json({ ok: true, payload: recipes });
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
        if (
            !doc.name ||
            !doc.baseUnit ||
            !doc.instructions ||
            !doc.ingredients ||
            !doc.client ||
            Object.keys(doc).length < 5
        ) {
            res.json({
                ok: false,
                payload: "All required fields are not provided !"
            });
            return;
        }
        if (typeof doc.name !== "string") {
            res.json({
                ok: false,
                payload: "Must provide a valid name !"
            });
            return;
        }
        if (doc.baseUnit !== "kg" && doc.baseUnit !== "l") {
            res.json({
                ok: false,
                payload: 'The base unit must be eather "kg" or "l" !'
            });
            return;
        }
    }
    Recipe.insertMany(payload)
        .then(recipes => {
            res.json({ ok: true, payload: recipes });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}
module.exports = {
    list,
    listByClient,
    create,
    update,
    remove,
    getOne,
    createMultiple
};
