const { Bill } = require("./bill");
const { Client } = require("./client");
const { Ingredient } = require("./ingredient");
const { Order } = require("./order");
const { Recipe } = require("./recipe");
const { Restaurant } = require("./restaurant");
function testModels() {
    const models = [Bill, Client, Ingredient, Order, Restaurant, Recipe];
    const promises = models.map(model => ({
        model,
        promise: model.estimatedDocumentCount()
    }));

    return new Promise((resolve, reject) => {
        Promise.all(promises.map(prom => prom.promise))
            .then(counts => {
                const collections = promises.map(
                    prom => prom.model.collection.name
                );
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
