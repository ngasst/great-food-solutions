const express = require('express');
const recipeRouter = express.Router();
const { recipe } = require('../handlers');

recipeRouter.get('/', recipe.list);
recipeRouter.post('/', recipe.create);
recipeRouter.put('/', recipe.update);
recipeRouter.delete('/', recipe.erise);

module.exports = {
    recipeRouter
}