import React from "react";
import { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import "./ProductList.css";

function ProductList() {
  // useState is like a "memory box" for our component
  // products - stores the list of products from API
  const [products, setProducts] = useState([]);
  
  // loading - shows a loading message while fetching
  const [loading, setLoading] = useState(true);
  
  // error - stores any error messages
  const [error, setError] = useState(null);

  // useEffect runs when the component loads
  // It's like "when this component appears on screen, do this..."
  useEffect(() => {
    // Call the function to fetch products
    fetchProducts();
  }, []);

  // Async function to fetch products from the API
  const fetchProducts = async () => {
    try {
      // Set loading to true before fetching
      setLoading(true);
      
      // Call the productService to get products
      const data = await productService.getAll();
      
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
      <div className="product-list-container">
        <div className="product-loading">Loading products...</div>
      </div>
    );
  }

  // If there's an error, show the error message
  if (error) {
    return (
      <div className="product-list-container">
        <div className="product-error">Error: {error}</div>
      </div>
    );
  }

  // Render the product grid
  return (
    <div className="product-list-container">
      {/* Check if there are no products */}
      {products.length === 0 ? (
        <div className="product-empty">No products available.</div>
      ) : (
        /* Map through products and create a card for each */
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {/* Product Image */}
              <div className="product-image-container">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image" 
                  />
                ) : (
                  <div className="product-image-placeholder">
                    No Image
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="product-info">
                {/* Product Name */}
                <h3 className="product-name">{product.name}</h3>
                
                {/* Product Category */}
                <span className="product-category">{product.category}</span>
                
                {/* Product Description */}
                <p className="product-description">
                  {product.description || "No description available."}
                </p>
                
                {/* Product Price */}
                <div className="product-price-container">
                  <span className="product-price">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  {/* Stock Status */}
                  <span className={`product-stock ${product.countInStock > 0 ? "in-stock" : "out-of-stock"}`}>
                    {product.countInStock > 0 ? `${product.countInStock} in stock` : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
