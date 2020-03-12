const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        maxlength: 4
    },
    TVA: {
        type: String,
        required: true,
        maxlength: 30
    },
    contact: {
        type: String,
        required: true
    },
    emailContact: {
        type: String,
        unique: true
    },
    telContact: {
        type: String,
        unique: true
    },
    siteInternet: {
        type: String,
    },
    deliveryDay: {
        type: String,
    },
    client: {
        type: SchemaTypes.ObjectId,
        ref: "Client"
    }
});

module.exports.Restaurant = model("Restaurant", schema);
