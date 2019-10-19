const express = require('express');
const ingredientsRouter = express.Router();
const ingredientRouter = express.Router();
const { ingredients, ingredient } = require('../handlers');

// define client routes and their handlers
// LIST
ingredientsRouter.get('/', ingredients.list);
ingredientRouter.get('/:id', ingredient.list);
// CREATE
ingredientsRouter.post('/', ingredients.create);
ingredientRouter.post('/', ingredient.create);
// UPDATE
ingredientRouter.put('/', ingredient.update);
// DELETE
ingredientRouter.delete('/:id', ingredient.remove);

module.exports = {
    ingredientsRouter,
    ingredientRouter
};