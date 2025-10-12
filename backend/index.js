const express = require("express");
const { connectDB } = require("./db/config");
const cors = require("cors");

const userRouter = require("./routes/userRoute");

const app = express();



connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/users",userRouter);



app.listen(4000,()=>{

    console.log("Server is listening to the port 4000");

});
