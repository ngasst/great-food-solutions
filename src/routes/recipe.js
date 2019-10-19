const express = require('express');
const recipeRouter = express.Router();
const { recipe } = require('../handlers');

// define client routes and their handlers
// LIST
recipeRouter.get('/', recipe.list);
// CREATE
recipeRouter.post('/', recipe.create);
// UPDATE
recipeRouter.put('/', recipe.update);
// DELETE
recipeRouter.delete('/:id', recipe.remove);

module.exports = {
    recipeRouter
}