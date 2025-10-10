const express = require("express");
const { connectDB } = require("./db/config");
const cors = require("cors");

const userRouter = require("./routes/userRoute");

const app = express();



connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/users",userRouter)



app.listen(4000,()=>{
    try {
        console.log("Server is listening to the port 4000");
    } catch (error) {
            console.log("Error on server side");
            }
})