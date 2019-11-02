const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema(
    {
        productionDay: {
            type: Date,
            required: true
        },
        deliveryDay: {
            type: Date,
            required: true
        },
        restaurant: {
            type: SchemaTypes.ObjectId,
            ref: "Restaurant"
        },
        recipes: [
            {
                recipe: {
                    type: SchemaTypes.ObjectId,
                    ref: "Recipe"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports.Order = model("Order", schema);
