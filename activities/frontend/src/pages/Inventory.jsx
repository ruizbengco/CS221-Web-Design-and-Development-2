import { useState, useEffect } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Login.css";
import TextArea from "../components/TextArea";
import slugify from "slugify";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState();
  const [slug, setSlug] = useState("");

  const { user } = useAuth();
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

    try {
      alert("Product Page.");
      setLoading(false);
    } catch (error) {
      setErrors({ error: error.message });
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
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Card title="Create Product">
      <form onSubmit={handleSubmit} className="login-form">
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
        <Input
          label="Slug"
          type="text"
          name="slug"
          value={slug}
          onChange={handleChange}
          error={errors.slug}
          disabled
        />
        <TextArea
          label="Description"
          name="description"
          error={errors.description}
          rows={10}
          cols={40}
        ></TextArea>
        <Input
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          error={errors.price}
          onChange={handleChange}
        />
        <Button type="submit" loading={loading}>
          Save Product
        </Button>
      </form>
    </Card>
  );
};

export default Inventory;
