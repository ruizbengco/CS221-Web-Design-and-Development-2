import React from "react";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-page">
      <Hero />
      <Features />
    </div>
  );
}
