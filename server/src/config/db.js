const mongoose = require('mongoose');
const dev = require('.')

const connectDB = async () => {
try {
    await mongoose.connect(dev.db.mongoUrl)
    console.log('Database connected')
} catch (error) { 
    console.log(error)
}
}

module.exports = connectDB 