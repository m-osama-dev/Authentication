const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://muhammadosama:1234@cluster0.x9cl8w4.mongodb.net/Authorization-1"
    );
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ MongoDB Connection Failed:", error.message);
  }
};

module.exports = { connectDB };
