import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import cartIcon from "../assets/cart-icon.png"; // make sure this image exists
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Hide navbar on auth pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="store-nav">
      <div className="nav-logo">
        <Link to="/store">Mini Store</Link>
      </div>
      <div className="nav-actions">
        <Link to="/add-product" className="nav-btn">Add Product</Link>
        <Link to="/cart" className="cart-btn">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          <span className="cart-count">{cartCount}</span>
        </Link>
        <button className="logout-btn desktop-only" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
