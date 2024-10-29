require('dotenv').config();
const mongoose = require('mongoose')

const connectDB = () => {
    return mongoose.connect(process.env.MONGOURI, {}).then(() =>{console.log('Connect to DATABASE SUCCESSFUL')})
}

module.exports = connectDB;