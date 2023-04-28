const createError = require("http-errors")
const Blog = require('../models/blog');


const getAllBlogs = async (req,res,next) => {
    try {
        const blogs = await Blog.find({}) 

        if(!blogs) throw createError(500,"Could not get the blogs data")

        res.status(200).json({ok:true,message:'All blogs', data:blogs})

    } catch (error) {
        next(error)
    }
}

const createBlog = async (req,res,next) => {
    try {
    
/*         jwt.verify(token, dev.app.jwtUserKey, async (err, decoded) => {
            if (err) throw createError(401,"Token is expired")
         */
            console.log(req.body)
            const { title, description } =  req.body;
        
            const newBlog = new Blog({ title, description });
        
            const blog = await newBlog.save();

        res.status(200).json({ok:true,return:"Blog created"})
/*     }) */
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllBlogs,createBlog}