const { Order } = require("../models");
const { parse, isValid } = require("date-fns");

function list(req, res) {
    Order.find({})
        .then(orders => {
            res.json({ ok: true, payload: orders });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function create(req, res) {
    // make sure to checkout the schema to see what needs implementing!
    const productionDay = parse(
        req.body.productionDay,
        "dd-MM-yyyy",
        new Date()
    );
    if (!isValid(productionDay)) {
        res.json({
            ok: false,
            payload:
                'Date format for "productionDay" is invalid! Please use dd-MM-yyyy'
        });
        return;
    }
    const deliveryDay = parse(req.body.deliveryDay, "dd-MM-yyyy", new Date());
    if (!isValid(deliveryDay)) {
        res.json({
            ok: false,
            payload:
                'Date format for "deliveryDay" is invalid! Please use dd-MM-yyyy'
        });
        return;
    }

    const recipes = req.body.recipes;
    if (!recipes && !Array.isArray(recipes)) {
        res.json({ ok: false, payload: '"recipies" should be an array!' });
        return;
    }

    const restaurant = req.body.restaurant;
    if (!restaurant) {
        res.json({ ok: false, payload: '"restaurant" should be provided!' });
        return;
    }

    const order = new Order({
        restaurant,
        productionDay,
        deliveryDay,
        recipes
    }); // since we made sure that our variables were named the same as the keys of the object,
    // we can replace {keyName: keyName} by {keyName}
    order
        .save()
        .then(createdDoc => {
            res.json({ ok: true, payload: createdDoc });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function remove(req, res) {
    const id = req.params.id;
    Order.findOneAndDelete({
        _id: id
    })
        .then(deletedOrder => {
            if (!deletedOrder) {
                res.json({ ok: false, payload: "ID provided does not exist" });
                return;
            }
            res.json({ ok: true, payload: null });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function put(req, res) {
    const { deliveryDay, productionDay, recipes, restaurant } = req.body;
    const id = req.body.id;
    if (!restaurant && !deliveryDay && !productionDay && !recipes) {
        res.json({ ok: false, payload: "Nothing to update!" });
        return;
    }

    const update = {};

    restaurant && (update.restaurant = restaurant);
    deliveryDay && (update.deliveryDay = deliveryDay);
    productionDay && (update.productionDay = productionDay);
    //recipes && (update.recipes = recipes);
    if (recipes) {
        Order.findOne({ _id: id })
            .lean()
            .then(({ recipes: existingRecipes }) => {
                const all = [...recipes, ...existingRecipes];
                const updatedRecipes = all.reduce((acc, curr, i) => {
                    const cond = !acc
                        .map(elem => {
                            return elem.recipe.toString();
                        })
                        .includes(curr.recipe.toString());
                    if (cond) {
                        acc.push(curr);
                    }
                    return acc;
                }, []);
                return { ...update, recipes: updatedRecipes };
            })
            .then(update => {
                Order.findOneAndUpdate(
                    {
                        _id: id
                    },
                    { ...update },
                    { new: true }
                ) // equivalent to findOneAndUpdate({_id: id}, update, {new: true})
                    .then(doc => {
                        res.json({ ok: true, payload: doc });
                    })
                    .catch(err => {
                        res.json({
                            ok: false,
                            payload: err.message || "FAILED"
                        });
                    });
            });
    } else {
        Order.findOneAndUpdate(
            {
                _id: id
            },
            { ...update },
            { new: true }
        ) // equivalent to findOneAndUpdate({_id: id}, update, {new: true})
            .then(doc => {
                res.json({ ok: true, payload: doc });
            })
            .catch(err => {
                res.json({ ok: false, payload: err.message || "FAILED" });
            });
    }
}

module.exports = {
    list,
    create,
    remove,
    put
};
