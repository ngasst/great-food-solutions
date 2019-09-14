const { Schema, model, SchemaTypes } = require("mongoose");

const BASEUNITTYTYPE = ['kg', 'l'];

const schema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: false
    },
    baseUnit: {
        type: String,
        enum: BASEUNITTYTYPE,
        required: true,
        unique: false
    },
    instructions: {
        stepNumber: {
            type: Number,
            required: true,
            unique: false
        },
        stepDescription: {
            type: String,
            required: true,
            unique: false
        }
    },
    ingredientId: {
        type: SchemaTypes.ObjectId,
        ref: 'Ingredient'
    },
    clientId: {
        type: SchemaTypes.ObjectId,
        ref: 'Client'
    }
});

module.exports.Recipe = model('Recipe', schema);