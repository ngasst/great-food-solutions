const { Schema, model, SchemaTypes } = require("mongoose");

const BASEUNITTYPE = ["kg", "l"];

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    baseUnit: {
        type: String,
        enum: BASEUNITTYPE,
        required: true
    },
    instructions: [
        {
            type: String,
            required: true
        }
    ],
    ingredients: [
        {
            ingredient: {
                type: SchemaTypes.ObjectId,
                ref: "Ingredient"
            },
            quantity: {
                type: Number,
                required: false
            }
        }
    ],
    client: {
        type: SchemaTypes.ObjectId,
        ref: "Client"
    }
});

module.exports.Recipe = model("Recipe", schema);
