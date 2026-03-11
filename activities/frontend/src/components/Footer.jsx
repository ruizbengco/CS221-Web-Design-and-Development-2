import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="footer-container">
        <div className="footer-content">
          <div classname="footer-brand">
            <h3>My App</h3>
            <p>
              Your one-stop solution for managing your inventory efficiently
            </p>
          </div>
          <div className="footer-link">
            <div className="link-group">
              <a href="/">Home</a>
              <a href="/login">Login</a>
              <a href="/inventory">Inventory</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 My App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
