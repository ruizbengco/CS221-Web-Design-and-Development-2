import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to My App</h1>
          <p className="hero-subtitle">
            Discover the best products at unbeatable prices.
          </p>
          <div className="hero-cta">
            <Link to="/login" className="cta-btn cta-primary">
              Get Started
            </Link>
            <Link to="/inventory" className="cta-btn cta-outline">
              View Inventory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
