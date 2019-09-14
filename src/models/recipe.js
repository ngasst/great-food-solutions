const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: false
    },
    baseUnit: {
        type: Number,
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
    ingredients: {
        name: {
            type: String,
            required: true,
            unique: true
        },
        quantity: {
            type: String,
            required: true,
            unique: false
        },
        price: {
            type: Number,
            required: true,
            unique: false
        }
    },
    clients: {
        firstName: {
            type: String,
            required: true,
            unique: false
        },
        surname: {
            type: String,
            required: true,
            unique: false
        }
    }
});

module.exports.Recipe = model('Recipe', schema);