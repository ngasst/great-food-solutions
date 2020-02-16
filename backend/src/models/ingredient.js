const { Schema, model } = require("mongoose");

const CATEGORYBASE = ["fruit and vegetables", "meat", "dairy", "bakery", "dried food products" ];
const BASEUNITTYPE = ["kg", "l", "piece"];

const schema = new Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    quantity: {
        number: {
            type: Number,
            required: true,
        },
        unitBase: {
            type: String,
            enum: BASEUNITTYPE,
            required: true,
        }
    },

    category: {
        type: String,
        enum: CATEGORYBASE,
        required: true,
    },

    supplier: {
        type: String,
        required: true,
    },

    brand: {
        type: String,
        required: true,
    },

});

module.exports.Ingredient = model("Ingredient", schema);
