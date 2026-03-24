const API_URL = "http://localhost:3000/api/orders";

// Order Service for API calls
export const orderService = {
  // POST /api/orders - Create a new order
  async createOrder(orderData) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create order.");
    }

    return data;
  },

  // GET /api/orders - Get user's orders
  async getMyOrders() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders.");
    }

    return data;
  },

  // GET /api/orders/:id - Get a specific order
  async getOrderById(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch order.");
    }

    return data;
  },

  // PUT /api/orders/:id/cancel - Cancel an order
  async cancelOrder(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to cancel order.");
    }

    return data;
  },
};
