import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import "./Cart.css";

const Cart = () => {
  // Get cart functions and values from context
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalItems,
    getTotalPrice,
    isLoaded,
  } = useCart();

  // Show loading while cart is being loaded from localStorage
  if (!isLoaded) {
    return <div className="cart-page">Loading...</div>;
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price?.toFixed(2)}</p>
                  <p className="cart-item-seller">
                    Sold by: {item.user?.username || "Unknown"}
                  </p>
                </div>

                <div className="cart-item-quantity">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-subtotal">
                  <p>Subtotal:</p>
                  <p className="subtotal-value">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{getTotalItems()}</span>
            </div>
            <div className="summary-row total">
              <span>Total Price:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <Link to="/products" className="btn-continue-shopping">
                Continue Shopping
              </Link>
              <Button className="btn-checkout">Proceed to Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
