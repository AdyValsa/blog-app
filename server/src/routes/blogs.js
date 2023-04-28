const blogRouter = require("express").Router();
const multer = require('multer')
const {getAllBlogs, createBlog} = require('../controllers/blogs')

blogRouter.get("/blog", getAllBlogs),
blogRouter.post("/blog/create-blog",multer().none(), createBlog)

module.exports = blogRouter;