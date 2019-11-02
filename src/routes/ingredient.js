const express = require("express");
const ingredientRouter = express.Router();
const { ingredient } = require("../handlers");

// define client routes and their handlers
// LIST
ingredientRouter.get("/", ingredient.list);
ingredientRouter.get("/:id", ingredient.getOne);
// CREATE
ingredientRouter.post("/multiple", ingredient.createMultiple);
ingredientRouter.post("/", ingredient.create);
// UPDATE
ingredientRouter.put("/", ingredient.update);
// DELETE
ingredientRouter.delete("/:id", ingredient.remove);

module.exports = {
    ingredientRouter
};
