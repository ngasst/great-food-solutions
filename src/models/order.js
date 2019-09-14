const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema({
    productionDay: {
        type: Date,
        required: true
    },
    deliveryDay: {
        type: Date,
        required: true,
    },
    restaurant: {
        type: SchemaTypes.ObjectId,
        ref: "Restaurant"
    },
   
    quantity: {
        type: number,
        required: true,
    },
});

module.exports.Order = model("Order", schema);
