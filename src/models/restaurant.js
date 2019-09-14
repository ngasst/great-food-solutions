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
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
        maxlength: 4
    },
    clientId: {
        type: SchemaTypes.ObjectId,
        ref: "Client"
    },
});

module.exports.Restaurant = model("Restaurant", schema);