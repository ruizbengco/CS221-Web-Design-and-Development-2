import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="landing-footer">
        <div className="footer-content">
          <p className="footer-brand">Buy n' Sell</p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Buy n' Sell. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
