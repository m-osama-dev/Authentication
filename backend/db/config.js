const mongoose = require("mongoose");


const connectDB = ()=>{
    try {
        const dbConnection = mongoose.connect("mongodb://localhost:27017/authentication")

        console.log("MongoDB Connected at localhost");
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {connectDB}