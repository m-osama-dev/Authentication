import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      setMessage("Signup successful! Redirecting to Sign In...");
      alert("Signup successful! You can now sign in.");

      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/signin"), 1000);
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Create Account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Join us today and get started
        </p>

        <form onSubmit={handleSubmit} className="text-left">
          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm mb-5 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>
        )}

        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
