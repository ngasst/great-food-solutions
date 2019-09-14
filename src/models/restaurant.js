const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema({
    restaurantId: {
        type: SchemaTypes.ObjectId,
        ref: "Restaurant"
    },
    name: {
        type: String,
        required: true,
        unique: true,
        length: 255,
    },
    street: {
        type: String,
        required: true,
        length: 255,
    },
    city: {
        type: String,
        required: true,
        length: 255,  
    },
    zipCode: {
        type: String,
        required: true,
        length: 4
    },
    clientId: {
        type: SchemaTypes.ObjectId,
        ref: "Client"
    },
});

module.exports.Restaurant = model("Restaurant", schema);