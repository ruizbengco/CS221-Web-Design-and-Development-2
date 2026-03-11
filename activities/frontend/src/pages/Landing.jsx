import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div>
      <Header />
      <Hero
        title="Welcome to my App"
        description="Your one-stop solution for managing your inventory efficiently"
        buttonText="Get started"
      />
      <MainContent />
      <Footer />
    </div>
  );
}
