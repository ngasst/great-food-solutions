const { Schema, model } = require('mongoose');

const schema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    }
})

module.exports.User = model("User", schema);