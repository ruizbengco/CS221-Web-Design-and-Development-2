import React from "react";
import { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  // useState is like a "memory box" for our component
  // products - stores the list of featured products from API
  const [products, setProducts] = useState([]);
  
  // loading - shows a loading message while fetching
  const [loading, setLoading] = useState(true);
  
  // error - stores any error messages
  const [error, setError] = useState(null);

  // useEffect runs when the component loads
  useEffect(() => {
    // Call the function to fetch featured products
    fetchFeaturedProducts();
  }, []);

  // Async function to fetch featured products from the API
  const fetchFeaturedProducts = async () => {
    try {
      // Set loading to true before fetching
      setLoading(true);
      
      // Call the productService to get featured products
      const data = await productService.getFeatured();
      
      // Update the products state with the data from API
      setProducts(data.products);
      
      // Set loading to false after getting data
      setLoading(false);
    } catch (err) {
      // If something goes wrong, save the error message
      setError(err.message);
      
      // Set loading to false
      setLoading(false);
    }
  };

  // If loading, show a loading message
  if (loading) {
    return (
      <div className="featured-container">
        <div className="featured-loading">Loading featured products...</div>
      </div>
    );
  }

  // If there's an error, show the error message
  if (error) {
    return (
      <div className="featured-container">
        <div className="featured-error">Error: {error}</div>
      </div>
    );
  }

  // Don't render anything if there are no featured products
  // This handles the case when no featured products exist
  if (products.length === 0) {
    return null;
  }

  // Render the featured products section
  return (
    <div className="featured-container">
      {/* Section Title */}
      <h2 className="featured-title">Featured Products</h2>
      <p className="featured-subtitle">Check out our special offers!</p>
      
      {/* Featured Products Grid */}
      <div className="featured-grid">
        {products.map((product) => (
          <div key={product._id} className="featured-card">
            {/* "Featured" Badge */}
            <div className="featured-badge">Featured</div>
            
            {/* Product Image */}
            <div className="featured-image-container">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="featured-image" 
                />
              ) : (
                <div className="featured-image-placeholder">
                  No Image
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="featured-info">
              {/* Product Name */}
              <h3 className="featured-name">{product.name}</h3>
              
              {/* Product Category */}
              <span className="featured-category">{product.category}</span>
              
              {/* Product Description */}
              <p className="featured-description">
                {product.description || "No description available."}
              </p>
              
              {/* Product Price */}
              <div className="featured-price-container">
                <span className="featured-price">
                  ${product.price.toFixed(2)}
                </span>
                
                {/* Stock Status */}
                <span className={`featured-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
