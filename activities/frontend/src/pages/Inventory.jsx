import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Inventory.css";
import TextArea from "../components/TextArea";
import slugify from "slugify";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { productService } from "../services/productService";

const Inventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    countInStock: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState("");

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare product data with the slug
      const productData = {
        name: formData.name,
        slug: slug, // Use the auto-generated slug
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category || "general",
        countInStock: parseInt(formData.countInStock, 10),
      };

      // Call the backend API to create the product
      await productService.create(productData);

      // Show success message
      alert("Product created successfully!");

      // Redirect to My Products page
      navigate("/my-products");
    } catch (error) {
      setErrors({ error: error.message });
      alert("Failed to create product: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const generatedSlug = slugify(formData.name, {
      lower: true,
      strict: true,
    });
    setSlug(generatedSlug);
  }, [formData]);

  useEffect(() => {
    // Only redirect if not loading and no user
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  return (
    <div className="inventory-page">
      <div className="inventory-card">
        <h1 className="inventory-title">Create Product</h1>
        <form onSubmit={handleSubmit} className="inventory-form">
          <div className="form-group">
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="form-group">
            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              rows={6}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                error={errors.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <Input
                label="Count In Stock"
                name="countInStock"
                type="number"
                value={formData.countInStock}
                error={errors.countInStock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
          <div className="form-group">
            <Input
              label="Image URL"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={errors.image}
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>
          <div className="form-group">
            <Input
              label="Category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
              placeholder="e.g., Electronics, Food, Clothing"
            />
          </div>
          <Button type="submit" loading={isSubmitting}>
            Save Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Inventory;
