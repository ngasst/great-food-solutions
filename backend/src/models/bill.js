const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema(
    {
        number: {
            type: String,
            required: true,
            unique: true,
            length: 9
        },
        client: {
            type: SchemaTypes.ObjectId,
            ref: "Client"
        },
        restaurant: {
            type: SchemaTypes.ObjectId,
            ref: "Restaurant"
        },
        orders: [
            {
                order: {
                    type: SchemaTypes.ObjectId,
                    ref: "Order"
                },
                serviceFees: {
                    type: Number
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports.Bill = model("Bill", schema);
