const express = require('express');
const userRouter = express.Router();
const { user } = require('../handlers');

userRouter.post("/signup", user.signUp);
userRouter.post("/signin", user.signIn);
userRouter.get("/", user.getUsers);

module.exports = {
    userRouter
}