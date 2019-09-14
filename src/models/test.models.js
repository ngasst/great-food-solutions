const { Bill } = require("./bill");
const { Client } = require("./client");
const { Ingredient } = require("./ingredient");
const { Order } = require("./order");
const { Recipe } = require("./recipe");
const { Restaurant } = require("./restaurant");
function testModels() {
    const promises = [
        Bill.estimatedDocumentCount(),
        Client.estimatedDocumentCount(),
        Ingredient.estimatedDocumentCount(),
        Order.estimatedDocumentCount(),
        Restaurant.estimatedDocumentCount(),
        Recipe.estimatedDocumentCount()
    ];

    return new Promise((resolve, reject) => {
        Promise.all(promises)
            .then(counts => {
                const collections = [
                    "bills",
                    "clients",
                    "ingredients",
                    "orders",
                    "restaurants",
                    "recipes"
                ];
                const mapped = collections.map((name, i) => ({
                    [name]: counts[i]
                }));

                const reduced = mapped.reduce(
                    (accumulateur, elementCourant) => {
                        accumulateur = { ...accumulateur, ...elementCourant };
                        return accumulateur;
                    },
                    {}
                );
                resolve(reduced);
            })
            .catch(err => reject(err));
    });
}

module.exports.testModels = testModels;
