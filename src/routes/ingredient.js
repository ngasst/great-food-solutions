const express = require('express');
const ingredientRouter = express.Router();
const { ingredient } = require('../handlers');

// define client routes and their handlers
// LIST
ingredientRouter.get('/', ingredient.list);
// CREATE
ingredientRouter.post('/', ingredient.create);
// UPDATE
ingredientRouter.put('/', ingredient.update);
// DELETE
ingredientRouter.delete('/:id', ingredient.remove);

module.exports = { 
    ingredientRouter 
};