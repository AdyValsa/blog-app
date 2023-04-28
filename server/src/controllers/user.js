const jwt =  require('jsonwebtoken');
const createError = require("http-errors")

const { hashPassword, comparePassword } = require("../utility/bcrypt");
const dev = require('../config');
const sendEmailWithNodeMailer = require('../utility/sendMail');
const User = require('../models/users');

const registerUser = async (req, res,next) => {
    console.log(req)
    try {
        const { name, email, password, phone } = req.body
        if (!name || !email || !password || !phone) throw createError(404,"Something is missing")
        
        if (password.length < 6 ) throw createError(404,"Password length must be at least 6")
/*        img size control
        const image = req.file;
        if (image && image.size > 1024**2) throw createError(400, "Image size is over 1mb, please resize it") */

        //User exists
        const user = await User.findOne({email})
        if (user) throw createError(400, "A user with this email already exists")

        const hashedPassword = await hashPassword(password)
        
        let token = jwt.sign({name,email,hashedPassword,phone}, dev.app.jwtUserKey, {expiresIn: "10m"})
 
        const emailData = {
            email,
            subject: "Account activation email",
            html: `
            <h2> Hello ${name}!</h2>
            <p>Please click <a href="${dev.app.serverUrl}/user/activate/${token}" target="_blank">THIS</a> to activate your account</p>`
        } 

        sendEmailWithNodeMailer(emailData)

        res.status(200).json({
            data: token,
            message: "user is created"
        })
    } catch (error) {
        next(error)
    }
}

const saveUser = async (req,res,next) => {
    try {
        
        const token = req.params.token
    
        jwt.verify(token, dev.app.jwtUserKey, async (err, decoded) => {
        if (err) throw createError(401,"Token is expired")
    
        const { name, email, hashedPassword, phone } = decoded;
    
        const newUser = new User({ name, email, password:hashedPassword, phone });
    
        const user = await newUser.save();
    
        res.status(200).json({message:"User added successfully"}) 
    }); 
    
    } catch (error) {
        next(error)
    }
    }
    
const loginUser = async (req,res,next) => {
    try {
        //find user
        const email = req.body.email
    
        const user = await User.findOne({email:email})
        
        console.log(req.body.password)
        console.log(user.password)

        const passwordMatch = await comparePassword(req.body.password,user.password)

        if(!passwordMatch) throw createError(401,'Wrong password');

        user.password = "";
        
        let token = jwt.sign({id: user.id}, dev.app.jwtUserKey, {expiresIn: "5m"});

        // reset cookie if it exists
        console.log(req.cookies[`${user.id}`])

        if(req.cookies[`${user.id}`]) { 
            req.cookies[`${user.id}`] = ""
        }  

        // create cookie with the name "user.id"
        res.cookie(String(user.id), token, {
            path:"/",
            expires: new Date(Date.now()+ 1000 * 15 * 60),
            httpOnly: true,
            secure: true,
            samesite: 'none'
        })

        res.status(200).json({message: "Logged in",data:user})

    } catch (error) {
        next(error)
    }
    }

module.exports = {registerUser, saveUser, loginUser}