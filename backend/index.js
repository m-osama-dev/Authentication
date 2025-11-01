const express = require("express");
const { connectDB } = require("./db/config");
const cors = require("cors");
const userRouter = require("./routes/userRoute");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ Correct CORS setup
app.use(
  cors({
    origin: "http://localhost:3000", // React app URL
    credentials: true, // allow cookies, tokens, etc.
  })
);

// ✅ Routes
app.use("/api/auth", userRouter);

// ✅ Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
