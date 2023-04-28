const userRouter = require("express").Router();
const multer = require('multer')
const formidable = require('express-formidable')

const { registerUser, saveUser, loginUser } = require("../controllers/user");
const { isLoggedIn } = require("../middlewares/auth");

userRouter.post("/user/register",multer().none(), registerUser)
userRouter.get("/user/activate/:token", saveUser)
userRouter.post("/user/login",multer().none(), loginUser)

module.exports = userRouter 