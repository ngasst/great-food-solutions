const { Schema, model } = require('mongoose');

const schema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: false
    }
});

module.export.Client = model('Client', schema);