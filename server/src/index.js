const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const createError = require("http-errors");

const blogRouter = require("./routes/blogs.js");
const userRouter = require("./routes/user.js");
const dev = require('./config');
const connectDB = require("./config/db.js");

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(blogRouter);
app.use(userRouter);

const PORT = dev.app.serverPort;

app.listen(PORT , async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectDB()
});

// test route
app.get("/test", (req,res) => {
    res.status(200).json({message: "server is running"});
    });

// client error
app.use((req,res,next)=>{
    next(createError(404,'Route not found'))
})

// server error
app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        error:{
            statusCode:err.status || 500,
            message:err.message
        }
    })
})