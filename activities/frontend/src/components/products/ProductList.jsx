import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  // Current slide index for carousel
  const [currentIndex, setCurrentIndex] = useState(0);

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
      
      // Call the productService to get all products
      const data = await productService.getAll();
      
      // Filter to only show featured products
      const featuredProducts = (data.products || []).filter(p => p.isFeatured);
      
      // Update the products state with only featured products
      setProducts(featuredProducts);
      
      // Set loading to false after getting data
      setLoading(false);
    } catch (err) {
      // If something goes wrong, save the error message
      setError(err.message);
      
      // Set loading to false
      setLoading(false);
    }
  };

  // Calculate how many products to show (3 products per "slide")
  const productsPerSlide = 3;
  const maxIndex = Math.max(0, products.length - productsPerSlide);

  // Go to previous slide
  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  // Go to next slide
  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Get products for current slide
  const currentProducts = products.slice(currentIndex, currentIndex + productsPerSlide);

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

  // Render the product carousel
  return (
    <div className="product-carousel">
      {/* Left Arrow */}
      <button 
        className="carousel-arrow carousel-prev" 
        onClick={goToPrev}
        disabled={currentIndex === 0 || products.length === 0}
      >
        &#8249;
      </button>

      {/* Product Cards */}
      <div className="product-carousel-container">
        {/* Check if there are no featured products */}
        {products.length === 0 ? (
          <div className="product-empty">No featured products available.</div>
        ) : (
          /* Show current products */
          <div className="product-grid">
            {currentProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
                <div className="product-card">
                  <div className="product-card-inner">
                    {/* Left side - Image */}
                    <div className="product-card-left">
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
                    </div>
                    
                    {/* Right side - Info */}
                    <div className="product-card-right">
                      {/* Product Name */}
                      <h3 className="product-name">{product.name}</h3>
                      
                      {/* Category and Seller */}
                      <div className="product-meta">
                        <span className="product-category">{product.category}</span>
                        <span className="product-seller">Sold by: {product.user?.username || "Unknown"}</span>
                      </div>
                      
                      {/* Price and Stock */}
                      <div className="product-bottom">
                        <span className="product-price">
                          ${product.price.toFixed(2)}
                        </span>
                        
                        <span className={`product-stock ${product.countInStock > 0 ? "in-stock" : "out-of-stock"}`}>
                          {product.countInStock > 0 ? `In Stock: ${product.countInStock}` : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right Arrow */}
      <button 
        className="carousel-arrow carousel-next" 
        onClick={goToNext}
        disabled={currentIndex >= maxIndex || products.length === 0}
      >
        &#8250;
      </button>
    </div>
  );
}

export default ProductList;
