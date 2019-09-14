const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema({
    
    ingredient: {
        type: SchemaTypes.ObjectId,
        ref: "Ingredient"
    },
    name: {
        type: String, 
        required: true, 
        unique: true,
    
    },
    price: {
         type: Number,  
         required: true,

            },
});

module.exports.Ingredient = model("Ingredient", schema);
