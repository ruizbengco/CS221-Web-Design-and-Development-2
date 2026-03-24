import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { productService } from "../services/productService";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import "./Products.css";

const Products = () => {
  // State to store products from the database
  const [products, setProducts] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);
  // State for success messages
  const [successMessage, setSuccessMessage] = useState(null);
  // State for quantity popup
  const [showQuantityPopup, setShowQuantityPopup] = useState(null);
  const [popupQuantity, setPopupQuantity] = useState(1);

  const { user, loading: authLoading } = useAuth();
  const { addToCart } = useCart();

  // Fetch products from the backend when component mounts
  useEffect(() => {
    // Function to fetch products from API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Call the backend to get all active products
        // Backend already filters to only show active products (isActive: true)
        const data = await productService.getAll();
        // Products are returned in data.products (based on controller)
        // Filter to ensure we only show active products (extra safety)
        const activeProducts = (data.products || data).filter(p => p.isActive);
        setProducts(activeProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading while checking auth
  if (authLoading) {
    return <div>Loading...</div>;
  }

  // If not logged in, products page should still work (browsing without cart)
  // But for now, redirect to login if not authenticated (optional)
  // We'll allow browsing without login

  // Function to open quantity popup
  const handleAddToCartClick = (product) => {
    setShowQuantityPopup(product);
    setPopupQuantity(1);
  };

  // Function to confirm adding to cart with quantity
  const handleConfirmAddToCart = () => {
    const product = showQuantityPopup;
    
    // Add the same product multiple times based on quantity
    for (let i = 0; i < popupQuantity; i++) {
      addToCart(product);
    }
    
    setShowQuantityPopup(null);
    setSuccessMessage(
      <span>
        {popupQuantity} x {product.name} added to cart! <Link to="/cart">View Cart</Link>
      </span>
    );
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Function to cancel popup
  const handleCancelPopup = () => {
    setShowQuantityPopup(null);
    setPopupQuantity(1);
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      
      {loading && <p>Loading products...</p>}
      
      {error && <p className="error-message">Error: {error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      {!loading && !error && products.length === 0 && (
        <p>No products available yet.</p>
      )}
      
      <div className="products-grid">
        {products.map((product) => (
          <Card key={product._id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-seller">Sold by: {product.user?.username || "Unknown"}</p>
              <p className="product-description">
                {product.description?.substring(0, 100)}
                {product.description?.length > 100 ? "..." : ""}
              </p>
              <p className="product-price">${product.price?.toFixed(2)}</p>
              <p className={`product-stock ${product.countInStock > 0 ? "in-stock" : "out-of-stock"}`}>
                {product.countInStock > 0 
                  ? `In Stock: ${product.countInStock}` 
                  : "Out of Stock"}
              </p>
              <button 
                className="add-to-cart-btn" 
                disabled={product.countInStock === 0}
                onClick={() => handleAddToCartClick(product)}
              >
                {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Quantity Popup Modal */}
      {showQuantityPopup && (
        <div className="quantity-popup-overlay" onClick={handleCancelPopup}>
          <div className="quantity-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Select Quantity</h3>
            <p className="popup-product-name">{showQuantityPopup.name}</p>
            <p className="popup-product-price">${showQuantityPopup.price?.toFixed(2)} each</p>
            
            <div className="quantity-selector">
              <button 
                className="qty-btn"
                onClick={() => setPopupQuantity(Math.max(1, popupQuantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                value={popupQuantity}
                onChange={(e) => setPopupQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={showQuantityPopup.countInStock}
                className="qty-input"
              />
              <button 
                className="qty-btn"
                onClick={() => setPopupQuantity(Math.min(showQuantityPopup.countInStock, popupQuantity + 1))}
              >
                +
              </button>
            </div>
            
            <p className="popup-total">
              Total: <strong>${(showQuantityPopup.price * popupQuantity).toFixed(2)}</strong>
            </p>
            
            <div className="popup-buttons">
              <button className="btn-cancel" onClick={handleCancelPopup}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleConfirmAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
