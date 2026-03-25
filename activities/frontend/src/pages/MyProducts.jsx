import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { productService } from "../services/productService";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import "./MyProducts.css";

const MyProducts = () => {
  // State to store user's products
  const [products, setProducts] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);
  // State for success messages
  const [success, setSuccess] = useState(null);
  // State to track which product is being edited
  const [editingStock, setEditingStock] = useState(null);
  // State for stock input value
  const [stockValue, setStockValue] = useState("");

  const { loading: authLoading } = useAuth();

  // Fetch user's products when component mounts
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getMyProducts();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  // Function to toggle product active/inactive status
  const handleToggleActive = async (product) => {
    try {
      // Toggle the isActive status
      const updatedData = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        countInStock: product.countInStock,
        isActive: !product.isActive, // Toggle
      };

      await productService.update(updatedData, product._id);
      
      // Update local state to reflect the change
      setProducts(products.map(p => 
        p._id === product._id ? { ...p, isActive: !p.isActive } : p
      ));
      
      setSuccess(`Product is now ${!product.isActive ? "active" : "inactive"}!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Function to toggle product featured status
  const handleToggleFeatured = async (product) => {
    try {
      await productService.toggleFeatured(product._id);
      
      // Update local state to reflect the change
      setProducts(products.map(p => 
        p._id === product._id ? { ...p, isFeatured: !p.isFeatured } : p
      ));
      
      setSuccess(`Product is now ${!product.isFeatured ? "featured" : "not featured"}!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Function to open stock edit popup
  const handleEditStock = (product) => {
    setEditingStock(product._id);
    setStockValue(product.countInStock.toString());
  };

  // Function to save stock update
  const handleSaveStock = async () => {
    const product = products.find(p => p._id === editingStock);
    if (!product) return;

    const newStock = parseInt(stockValue, 10);
    
    // Validate stock value
    if (isNaN(newStock) || newStock < 0) {
      setError("Please enter a valid stock number (0 or greater)");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const updatedData = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        countInStock: newStock,
        isActive: product.isActive,
      };

      await productService.update(updatedData, product._id);
      
      // Update local state
      setProducts(products.map(p => 
        p._id === product._id ? { ...p, countInStock: newStock } : p
      ));
      
      setEditingStock(null);
      setSuccess("Stock updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingStock(null);
    setStockValue("");
  };

  // Show loading while checking auth
  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-products-page">
      <div className="page-header">
        <h1>My Products</h1>
        <a href="/inventory" className="btn-list-product">
          + List New Product
        </a>
      </div>
      
      {loading && <p>Loading your products...</p>}
      
      {error && <p className="message error">{error}</p>}
      {success && <p className="message success">{success}</p>}
      
      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <p>You haven't created any products yet.</p>
          <a href="/inventory" className="btn-link">Create Your First Product</a>
        </div>
      )}
      
      <div className="products-list">
        {products.map((product) => (
          <Card key={product._id} className={`product-item ${product.isActive ? "active" : "inactive"}`}>
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
                    {product.description?.substring(0, 100)}
                    {product.description?.length > 100 ? "..." : ""}
                  </p>
                </div>
                <div className="product-meta">
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price?.toFixed(2)}</p>
                  <p className={`product-stock ${product.countInStock > 0 ? "in-stock" : "out-of-stock"}`}>
                    {product.countInStock > 0 
                      ? `In Stock: ${product.countInStock}` 
                      : "Out of Stock"}
                  </p>
                  <p className={`product-status ${product.isActive ? "status-active" : "status-inactive"}`}>
                    {product.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
            <div className="product-actions">
              <Button 
                onClick={() => handleToggleFeatured(product)}
                className={product.isFeatured ? "btn-unfeature" : "btn-feature"}
              >
                {product.isFeatured ? "Unfeature" : "Feature"}
              </Button>
              <Button 
                onClick={() => handleEditStock(product)}
                className="btn-edit-stock-action"
              >
                Edit Stock ({product.countInStock})
              </Button>
              <Button 
                onClick={() => handleToggleActive(product)}
                className={product.isActive ? "btn-inactive" : "btn-activate"}
              >
                {product.isActive ? "Mark Inactive" : "Mark Active"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Stock Edit Popup */}
      {editingStock && (
        <div className="stock-popup-overlay" onClick={handleCancelEdit}>
          <div className="stock-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Stock</h3>
            <p className="stock-product-name">
              {products.find(p => p._id === editingStock)?.name}
            </p>
            <div className="stock-input-group">
              <label>New Stock:</label>
              <input
                type="number"
                value={stockValue}
                onChange={(e) => setStockValue(e.target.value)}
                min="0"
                className="stock-popup-input"
              />
            </div>
            <div className="stock-popup-buttons">
              <button className="btn-cancel" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleSaveStock}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
