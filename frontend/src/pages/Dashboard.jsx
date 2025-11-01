import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/signin";
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>
      <p className="text-lg text-gray-600 mt-2">
        You are successfully logged in.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/user"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Go to Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2.5 rounded-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
