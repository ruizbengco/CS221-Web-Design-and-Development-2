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

  // State for filter sidebar
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

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

        // Extract unique categories from products
        const uniqueCategories = [...new Set(activeProducts.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);

        // Calculate price range from products
        if (activeProducts.length > 0) {
          const prices = activeProducts.map(p => p.price);
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query, category, and price
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    return filtered;
  }, [products, searchQuery, selectedCategories, priceRange]);

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

  // Function to handle category checkbox change
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // Remove category if already selected
        return prev.filter(c => c !== category);
      } else {
        // Add category if not selected
        return [...prev, category];
      }
    });
  };

  // Function to handle price range change
  const handlePriceChange = (event, index) => {
    const value = parseInt(event.target.value);
    setPriceRange(prev => {
      const newRange = [...prev];
      newRange[index] = value;
      // Ensure min is always less than or equal to max
      if (newRange[0] > newRange[1]) {
        newRange[index === 0 ? 1 : 0] = value;
      }
      return newRange;
    });
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      {loading && <p>Loading products...</p>}
      
      {error && <p className="error-message">Error: {error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Filter Sidebar */}
      <div className="products-container">
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <h4>Categories</h4>
            {categories.length === 0 ? (
              <p className="no-categories">No categories available</p>
            ) : (
              <div className="category-list">
                {categories.map(category => (
                  <label key={category} className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <div className="price-input-group">
                <label>Min: ${priceRange[0]}</label>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                />
              </div>
              <div className="price-input-group">
                <label>Max: ${priceRange[1]}</label>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                />
              </div>
            </div>
            <p className="price-display">
              ${priceRange[0]} - ${priceRange[1]}
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="products-main">
          {/* Search Results Info */}
          {(searchQuery || selectedCategories.length > 0 || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
            <div className="search-results-info">
              <p>
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              <button onClick={clearSearch} className="clear-search-btn">
                Clear Search
              </button>
            </div>
          )}
          
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="no-products">
              {searchQuery || selectedCategories.length > 0 ? (
                <p>No products match your filters. Try adjusting your filters.</p>
              ) : (
                <p>No products available yet.</p>
              )}
            </div>
          )}
          
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
                <div className="product-card">
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
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
