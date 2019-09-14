const { Schema, model } = require('mongoose');

const schema = new Schema ({
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
});

module.export.Client = model('Client', schema);