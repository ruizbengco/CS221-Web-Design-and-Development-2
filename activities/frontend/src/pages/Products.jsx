import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { productService } from "../services/productService";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

  // Get search params from URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { addToCartWithQuantity } = useCart();
  const navigate = useNavigate();

  // Check if the current user is the owner of the product
  const isProductOwner = (product) => {
    if (!user || !product.user) return false;
    return String(user._id) === String(product.user._id);
  };

  // Fetch products from the backend when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
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

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Show loading while checking auth
  if (authLoading) {
    return <div>Loading...</div>;
  }

  // Function to open quantity popup
  const handleAddToCartClick = (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Check if user is trying to buy their own product
    if (isProductOwner(product)) {
      alert("You cannot buy your own products!");
      return;
    }
    
    setShowQuantityPopup(product);
    setPopupQuantity(1);
  };

  // Function to confirm adding to cart with quantity
  const handleConfirmAddToCart = () => {
    const product = showQuantityPopup;
    addToCartWithQuantity(product, popupQuantity);
    
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

  // Function to clear search
  const clearSearch = () => {
    navigate("/products");
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      {loading && <p>Loading products...</p>}
      
      {error && <p className="error-message">Error: {error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      {/* Search Results Info */}
      {searchQuery && (
        <div className="search-results-info">
          <p>
            Showing results for "{searchQuery}" ({filteredProducts.length} products found)
          </p>
          <button onClick={clearSearch} className="clear-search-btn">
            Clear Search
          </button>
        </div>
      )}
      
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="no-products">
          {searchQuery ? (
            <p>No products match your search. Try a different search term.</p>
          ) : (
            <p>No products available yet.</p>
          )}
        </div>
      )}
      
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-card-left">
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
            </div>
            <div className="product-card-right">
              <div className="product-main-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">
                  {product.description?.substring(0, 150)}
                  {product.description?.length > 150 ? "..." : ""}
                </p>
              </div>
              <div className="product-meta">
                <p className="product-category">{product.category}</p>
                <p className="product-seller">Sold by: {product.user?.username || "Unknown"}</p>
                <p className="product-price">${product.price?.toFixed(2)}</p>
                <p className={`product-stock ${product.countInStock > 0 ? "in-stock" : "out-of-stock"}`}>
                  {product.countInStock > 0 
                    ? `In Stock: ${product.countInStock}` 
                    : "Out of Stock"}
                </p>
                <button 
                  className={`add-to-cart-btn ${isProductOwner(product) ? "own-product" : ""}`}
                  disabled={product.countInStock === 0 || isProductOwner(product)}
                  onClick={() => handleAddToCartClick(product)}
                >
                  {isProductOwner(product) 
                    ? "Your Product" 
                    : product.countInStock > 0 
                      ? "Add to Cart" 
                      : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
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
