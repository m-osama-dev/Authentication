const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModal");

const users = []; // { id, email, passwordHash }
const refreshTokensStore = new Map(); // key: refreshToken, value: { userId, expiry, rotationId }

function signAccessToken(user) {
  // short-lived
  return jwt.sign({ id: user._id, email: user.email }, "thisissecret", {
    expiresIn: "15m",
  });
}

function signRefreshToken(user) {
  // longer lived
  return jwt.sign({ id: user._id, tokenType: "refresh" }, "thisissecret", {
    expiresIn: "7d",
    issuer: "your-app",
  });
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password safely
    const isMatch = await bcryptjs.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate tokens
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    refreshTokensStore.set(refreshToken, {
      userId: user._id.toString(),
      expiresAt: Date.now() + 7 * 24 * 3600 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 3600 * 1000,
    });

    // ✅ Always send a consistent JSON shape
    res.json({
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


const signup = async (req, res) => {
  const { email, password, name } = req.body;

  console.log(email, password, name);

  const hashedPassword = (await bcryptjs.hash(password, 10)).toString();

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  const createdUser = await newUser.save();
  res
    .json({ message: "User created successfully", user: createdUser })
    .status(201);
};

const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401);

  // verify token signature
  jwt.verify(token, "thisissecret", (err, payload) => {
    if (err) return res.status(401);
    // check server-side store
    const entry = refreshTokensStore.get(token);
    if (!entry) {
      return res.status(401);
    }

    // rotate: remove old, issue new
    refreshTokensStore.delete(token);

    const userId = payload.id;
    const user = User.find((u) => u._id === userId);
    if (!user) return res.status(401);

    const newAccessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user);
    refreshTokensStore.set(newRefreshToken, {
      userId,
      expiresAt: Date.now() + 7 * 24 * 3600 * 1000,
    });

    // set new refresh cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 3600 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  });
};

const logout = (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    refreshTokensStore.delete(token);
    res.clearCookie("refreshToken");
  }
  res.json({ ok: true });
};

module.exports = { signin, signup, refreshToken, logout };
