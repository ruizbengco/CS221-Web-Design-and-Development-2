import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService";
import "./MyOrders.css";

const MyOrders = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  // Handle order cancellation
  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingId(orderId);
      await orderService.cancelOrder(orderId);
      
      // Update the order status in the local state to show "cancelled"
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
      
      alert("Order cancelled successfully!");
    } catch (err) {
      alert(err.message || "Failed to cancel order.");
    } finally {
      setCancellingId(null);
    }
  };

  // Check if order can be cancelled (only pending or processing)
  const canCancelOrder = (status) => {
    return status === "pending" || status === "processing";
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getMyOrders();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (authLoading || loading) {
    return <div className="orders-page">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      
      {error && <p className="error-message">{error}</p>}
      
      {orders.length === 0 ? (
        <div className="orders-card">
          <div className="orders-empty">
            <span className="orders-icon">📋</span>
            <p>No orders yet</p>
            <p className="orders-note">
              When you place orders, they will appear here.
            </p>
            <a href="/products" className="btn-shop-now">
              Shop Now
            </a>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <span className="order-label">Order ID:</span>
                  <span className="order-value">#{order._id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.status}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="order-details">
                <div className="order-info-row">
                  <span className="order-label">Date:</span>
                  <span className="order-value">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="order-info-row">
                  <span className="order-label">Total:</span>
                  <span className="order-value">${order.totalPrice.toFixed(2)}</span>
                </div>
                <div className="order-info-row">
                  <span className="order-label">Items:</span>
                  <span className="order-value">
                    {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">x{item.quantity}</span>
                    </div>
                    <div className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-shipping">
                <span className="shipping-label">Shipping to:</span>
                <span className="shipping-address">
                  {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                </span>
              </div>

              {canCancelOrder(order.status) && (
                <div className="order-actions">
                  <button
                    className="btn-cancel-order"
                    onClick={() => handleCancelOrder(order._id)}
                    disabled={cancellingId === order._id}
                  >
                    {cancellingId === order._id ? "Cancelling..." : "Cancel Order"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
