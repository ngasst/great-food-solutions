const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema({
    productionDay: {
        type: Date,
        required: true,
        unique: true,
        length: 7
    },
    deliveryDay: {
        type: Date,
        required: true,
        unique: true,
        length: 7
    },
    restaurantId: {
        type: SchemaTypes.ObjectId,
        ref: "Restaurant"
    },
   
    quantity: {
        type: Number,
        required: true,
        unique: true,
        length: 4
    },
});

module.exports.Order = model("Order", schema);
