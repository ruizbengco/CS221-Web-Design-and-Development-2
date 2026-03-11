const API_URL = "http://localhost:3000/api/auth";

export const authService = {
  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    return data;
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async logout() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return response.ok;
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.stringify(userStr) : null;
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
