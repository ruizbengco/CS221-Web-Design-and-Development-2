const API_URL = "http://localhost:3000/api/product";

// Product Service for API calls
// This service handles all product-related HTTP requests
export const productService = {
  // GET /api/product - Get all active products
  async getAll() {
    // Make a GET request to fetch products
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the JSON response
    const data = await response.json();

    // If response is not OK, throw an error
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products.");
    }

    // Return the products array
    return data;
  },

  // GET /api/product?includeInactive=true - Get all products (including inactive, for admin)
  async getAllAdmin() {
    const response = await fetch(`${API_URL}?includeInactive=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch all products.");
    }

    return data;
  },

  // GET /api/product/featured - Get only featured products
  async getFeatured() {
    const response = await fetch(`${API_URL}/featured`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch featured products.");
    }

    return data;
  },

  // POST /api/product/create - Create a new product
  async create(productData) {
    // Get token from localStorage for authentication
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization header if token exists
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create product.");
    }

    return data;
  },

  // PUT /api/product/update/:id - Update a product
  async update(productData, id) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update product.");
    }

    return data;
  },

  // POST /api/product/:id/feature - Toggle featured status
  async toggleFeatured(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}/feature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to toggle featured status.");
    }

    return data;
  },
};
