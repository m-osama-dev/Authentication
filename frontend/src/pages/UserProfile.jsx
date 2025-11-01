import React from "react";

function UserProfile() {
  const user = { name: "John Doe", email: "john@example.com" }; // Replace with real user data later

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Profile</h1>
      <div style={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "60px",
  },
  title: {
    fontSize: "28px",
    color: "#333",
  },
  card: {
    display: "inline-block",
    background: "#fff",
    padding: "20px 30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginTop: "20px",
    textAlign: "left",
  },
};

export default UserProfile;
