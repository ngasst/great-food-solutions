const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema({
    
    IngredientId: {
        type: SchemaTypes.ObjectId,
        ref: "Ingredient"
    },
    Name: {
        type: String,
        length: 255, 
        required: true, 
        unique: true,
    
    },
    Price: {
         type: Number,  
         required: true,

            },
});

module.exports.Ingredient = model("Ingredient", schema);
