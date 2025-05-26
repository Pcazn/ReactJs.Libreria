import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cartItemCount }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/cart">Cart ({cartItemCount})</Link>
    </nav>
  );
}
