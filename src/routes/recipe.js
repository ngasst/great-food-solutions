const express = require('express');
const recipesRouter = express.Router();
const recipeRouter = express.Router();
const { recipes, recipe } = require('../handlers');

// define client routes and their handlers
// LIST
recipesRouter.get('/', recipes.list);
recipeRouter.get('/:id', recipe.list);
// CREATE
recipesRouter.post('/', recipes.create);
recipeRouter.post('/', recipe.create);
// UPDATE
recipeRouter.put('/', recipe.update);
// DELETE
recipeRouter.delete('/:id', recipe.remove);

module.exports = {
    recipesRouter,
    recipeRouter
}