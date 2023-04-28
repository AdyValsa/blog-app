const {Schema, model} = require('mongoose')

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    description: {
        type: String,
        required: true,
        trim:true,
    },
/*     image: {
        type:String,
        required:true
    } */
},
{timestamps: true})

const Blog = model("Blog", blogSchema)

module.exports = Blog