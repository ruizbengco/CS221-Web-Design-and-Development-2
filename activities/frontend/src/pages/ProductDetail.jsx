import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { productService } from "../services/productService";
import "./ProductDetail.css";

const ProductDetail = () => {
  // Get the product ID from the URL
  const { id } = useParams();
  
  // State to store the product
  const [product, setProduct] = useState(null);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);
  // State for success messages
  const [successMessage, setSuccessMessage] = useState(null);
  // State for quantity selector
  const [quantity, setQuantity] = useState(1);

  // Get auth and cart functions
  const { user, isAuthenticated } = useAuth();
  const { addToCartWithQuantity } = useCart();
  const navigate = useNavigate();

  // Check if current user is the product owner
  const isProductOwner = () => {
    if (!user || !product || !product.user) return false;
    return String(user._id) === String(product.user._id);
  };

  // Fetch product when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Check if id exists and is not empty
        if (!id) {
          setError("Product ID is missing. Please select a product from the products page.");
          setLoading(false);
          return;
        }
        
        const data = await productService.getById(id);
        setProduct(data.product);
      } catch (err) {
        // Provide more helpful error messages
        if (err.message.includes("Invalid product ID")) {
          setError("This product link appears to be invalid. The product may have been deleted or the link is broken.");
        } else if (err.message.includes("Product not found")) {
          setError("This product no longer exists or has been removed.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isProductOwner()) {
      alert("You cannot buy your own products!");
      return;
    }

    addToCartWithQuantity(product, quantity);
    setSuccessMessage(
      <span>
        {quantity} x {product.name} added to cart! <Link to="/cart">View Cart</Link>
      </span>
    );
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Show loading
  if (loading) {
    return <div className="product-detail-loading">Loading product...</div>;
  }

  // Show error
  if (error) {
    return (
      <div className="product-detail-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          &larr; Go Back
        </button>
        <div className="product-detail-error">
          <h2>Oops!</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/products")}>Browse Products</button>
        </div>
      </div>
    );
  }

  // Show if product not found
  if (!product) {
    return (
      <div className="product-detail-page">
        <button onClick={() => navigate(-1)} className="back-btn">
          &larr; Go Back
        </button>
        <div className="product-detail-not-found">
          <h2>Product Not Found</h2>
          <p>This product may have been removed or doesn't exist.</p>
          <button onClick={() => navigate("/products")}>Browse Products</button>
        </div>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = product.price * quantity;

  return (
    <div className="product-detail-page">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="back-btn">
        &larr; Back
      </button>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="product-detail-container">
        {/* Product Image */}
        <div className="product-detail-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1 className="product-name">{product.name}</h1>
          
          <p className="product-seller">
            Sold by: <strong>{product.user?.username || "Unknown"}</strong>
          </p>

          <p className="product-price">${product.price?.toFixed(2)}</p>

          <div className={`product-stock ${product.countInStock > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.countInStock > 0 
              ? `In Stock (${product.countInStock} available)` 
              : "Out of Stock"}
          </div>

          {/* Description */}
          <div className="product-description-section">
            <h3>Description</h3>
            <p>{product.description || "No description provided."}</p>
          </div>

          {/* Add to Cart Section */}
          {product.countInStock > 0 && !isProductOwner() && (
            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity} disabled={quantity >= product.countInStock}>+</button>
              </div>
              
              <button onClick={handleAddToCart} className="add-to-cart-btn">
                Add to Cart - ${totalPrice.toFixed(2)}
              </button>
            </div>
          )}

          {isProductOwner() && (
            <div className="owner-message">
              This is your product
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
