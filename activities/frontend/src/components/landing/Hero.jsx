import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Hero.css";

export default function Hero() {
  // Get authentication status
  const { isAuthenticated } = useAuth();

  // If logged in, go to products page; if not, go to login
  const getStartedLink = isAuthenticated ? "/products" : "/login";

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to My App</h1>
          <p className="hero-subtitle">
            Discover the best products at unbeatable prices.
          </p>
          <div className="hero-cta">
            <Link to={getStartedLink} className="cta-btn cta-primary">
              Get Started
            </Link>
            <Link to="/products" className="cta-btn cta-outline">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
