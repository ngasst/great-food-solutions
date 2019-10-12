const express = require('express');
const ingredientRouter = express.Router();
const { ingredient } = require('../handlers');

// define client routes and their handlers
// LIST
ingredientRouter.get('/', ingredient.list);
ingredientRouter.post('/', ingredient.create);
ingredientRouter.put('/', ingredient.update);
ingredientRouter.delete('/', ingredient.erise);

module.exports = { 
    ingredientRouter 
};