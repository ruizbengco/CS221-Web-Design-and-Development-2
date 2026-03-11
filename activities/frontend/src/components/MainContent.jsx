import React from "react";
import "./MainContent.css";

export default function MainContent() {
  const features = [
    { id: 1, title: "Feature 1", description: "Description of Feature 1" },
    { id: 2, title: "Feature 2", description: "Description of Feature 2" },
    { id: 3, title: "Feature 3", description: "Description of Feature 3" },
  ];
  return (
    <div>
      <main className="content-wrapper">
        <section className="intro-section">
          <h2>Introduction</h2>
          <p> Lorem Ipsum</p>
        </section>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
