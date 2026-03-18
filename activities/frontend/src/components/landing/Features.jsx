import React from "react";
import ProductList from "../products/ProductList";
import "./Features.css";

export default function Features() {
  return (
    <div>
      <main className="features-section">
        <div className="features-inner">
          <h2 className="features-title">Our Products</h2>
          <p className="features-subtitle">Browse our complete catalog of products</p>
          
          {/* Product List Component */}
          <ProductList />
        </div>
      </main>
    </div>
  );
}
