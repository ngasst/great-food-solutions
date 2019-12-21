const { Schema, model, SchemaTypes } = require("mongoose");

const CATEGORYBASE = ["fruit and vegetables", "meat", "dairy", "bakery", "dried food products" ];

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,

    },
    price: {
        type: Number,
        required: true,

    },

    quantity: {
            type: Number,
            required: true,
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
