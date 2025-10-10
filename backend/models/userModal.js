const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({

    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    }   


})



const User = mongoose.model("Users",userSchema);

module.exports= User

