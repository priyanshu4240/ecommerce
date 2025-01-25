import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
      <div style={{ fontSize: "10rem" }}>⚠️</div>
      <h1 style={{ fontSize: "3rem" }}>404</h1>
      <h2 style={{ fontSize: "2rem" }}>Not Found</h2>
      <Link to="/" style={{ fontSize: "1.2rem", marginTop: "1rem", color: "blue", textDecoration: "underline" }}>
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
