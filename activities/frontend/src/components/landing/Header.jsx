import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import ThemeToggle from "../ThemeToggle";
import "./Header.css";

export default function Header() {
  // Get user and logout function from AuthContext
  const { user, logout, isAuthenticated } = useAuth();
  
  // Get cart item count
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate("/");
  };

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle dropdown item click
  const handleDropdownClick = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <header className="landing-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">Buy n' Sell</Link>
          </div>
          
          {/* Search Form */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>

          <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </nav>
          
          <div className="auth-section">
            {/* Theme toggle switch */}
            <ThemeToggle />
            
            {/* Cart Icon with Badge - Only show when logged in */}
            {isAuthenticated && (
              <Link to="/cart" className="cart-icon">
                <span className="cart-emoji">🛒</span>
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </Link>
            )}
            
            {isAuthenticated ? (
              // Profile Dropdown
              <div className="profile-dropdown" ref={dropdownRef}>
                <button 
                  className="profile-icon" 
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  👤
                </button>
                
                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <span className="dropdown-username">{user?.username}</span>
                      <span className="dropdown-email">{user?.email}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link 
                      to="/my-profile" 
                      className="dropdown-item"
                      onClick={handleDropdownClick}
                    >
                      👤 My Profile
                    </Link>
                    <Link 
                      to="/my-products" 
                      className="dropdown-item"
                      onClick={handleDropdownClick}
                    >
                      📦 My Products
                    </Link>
                    <Link 
                      to="/my-orders" 
                      className="dropdown-item"
                      onClick={handleDropdownClick}
                    >
                      📋 My Orders
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Show login button if not logged in
              <Link to="/login" className="login-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
