import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <div className="font-sans min-h-screen bg-gray-50">
        {/* ✅ Navbar */}
        <nav className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 shadow-md sticky top-0 z-50">
          <div className="text-white text-lg font-bold">AuthApp</div>
          <div className="flex gap-4">
            <Link
              to="/signin"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-md font-medium text-sm transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-md font-medium text-sm transition"
            >
              Sign Up
            </Link>
            <Link
              to="/user"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-md font-medium text-sm transition"
            >
              Profile
            </Link>
          </div>
        </nav>

        {/* ✅ Page Routes */}
        <div className="mt-10 px-6">
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
