const { Schema, model, SchemaTypes } = require("mongoose");

const BASEUNITTYTYPE = ["kg", "l"];

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    baseUnit: {
        type: String,
        enum: BASEUNITTYTYPE,
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
            type: SchemaTypes.ObjectId,
            ref: "Ingredient"
        }
    ],
    client: {
        type: SchemaTypes.ObjectId,
        ref: "Client"
    }
});

module.exports.Recipe = model("Recipe", schema);
