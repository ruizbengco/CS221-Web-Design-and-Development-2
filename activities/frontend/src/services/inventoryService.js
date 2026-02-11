const API_URL = "http://localhost:3000/api/product";

export const inventoryService = {
  async register(productData) {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();

    if (!response.ok) {
      // 2nd parameter is called Fallback
      throw new Error(data.message || "Product listing failed.");
    }
    return data;
  },

  async update(productData, id) {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Product update failed.");
    }
    
    return data;
  },
};
