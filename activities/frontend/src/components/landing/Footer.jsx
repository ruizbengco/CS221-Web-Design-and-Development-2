import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="landing-footer">
        <div className="footer-content">
          <p className="footer-brand">My App</p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear} My App. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
