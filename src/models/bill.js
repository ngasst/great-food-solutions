const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema({
    number: {
        type: String,
        required: true,
        unique: true,
        length: 9
    },
    clientId: {
        type: SchemaTypes.ObjectId,
        ref: "Client"
    },
    restaurantId: {
        type: SchemaTypes.ObjectId,
        ref: "Restaurant"
    },
    orders: [
        {
            orderId: {
                type: SchemaTypes.ObjectId,
                ref: "Order"
            },
            serviceFees: {
                type: Number
            }
        }
    ]
});



module.exports.Bill = model("Bill", schema);
