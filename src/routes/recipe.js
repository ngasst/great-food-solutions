const express = require("express");
const recipeRouter = express.Router();
const { recipe } = require("../handlers");

// define client routes and their handlers
// LIST
recipeRouter.get("/", recipe.list);
recipeRouter.get("/:id", recipe.getOne);
// CREATE
recipeRouter.post("/multiple", recipe.createMultiple);
recipeRouter.post("/", recipe.create);
// UPDATE
recipeRouter.put("/", recipe.update);
// DELETE
recipeRouter.delete("/:id", recipe.remove);

module.exports = {
    recipeRouter
};
