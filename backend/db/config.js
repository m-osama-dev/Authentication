const mongoose = require("mongoose");


const connectDB = ()=>{
    try {
        const dbConnection = mongoose.connect("mongodb+srv://1234:1234@cluster0.4xko3.mongodb.net/Practice")

        console.log("MongoDB Connected at cluster0.4xko3.mongodb.net");
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {connectDB}