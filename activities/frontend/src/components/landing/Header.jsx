import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import Button from "../Button";
import ThemeToggle from "../ThemeToggle";
import "./Header.css";

export default function Header() {
  // Get user and logout function from AuthContext
  const { user, logout, isAuthenticated } = useAuth();
  
  // Get cart item count
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className="landing-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">My App</Link>
          </div>
          <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            {isAuthenticated && <Link to="/my-products">My Products</Link>}
          </nav>
          <div className="auth-section">
            {/* Theme toggle switch */}
            <ThemeToggle />
            
            {/* Cart Icon with Badge */}
            <Link to="/cart" className="cart-icon">
              <span className="cart-emoji">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
            
            {isAuthenticated ? (
              // Show username and logout button if logged in
              <>
                <span className="user-name">Welcome, {user?.username}</span>
                <Button type="button" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              // Show login button if not logged in
              <Link to="/login">
                <Button type="button">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
