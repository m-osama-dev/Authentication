const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModal");







function signAccessToken(user) {
  // short-lived
  return jwt.sign(
    { id: user._id, email: user.email },
    "thisissecret",
    { expiresIn: '15m' }
  );
}



function signRefreshToken(user) {
  // longer lived
  return jwt.sign(
    { id: user._id, tokenType: 'refresh' },
    "thisissecret",
    { expiresIn: '7d', issuer: 'your-app' }
  );
}




const signin =(req,res)=>{

const {email,password} = req.body;
// console.log("email:",email,"password:",password);

const user = User.find({email});
console.log(user);



res.json({userData:user}).status(200);
}


const signup = async(req,res)=>{
    const {email,password,name} = req.body;

    console.log(email,password,name);
    
    
    const hashedPassword = (await bcryptjs.hash(password,10)).toString();

const newUser = new User({
    name,
    email,
    password:hashedPassword
})
  const createdUser = await newUser.save();
    res.json({message:"User created successfully",user:createdUser}).status(201);
}

module.exports ={signin,signup}