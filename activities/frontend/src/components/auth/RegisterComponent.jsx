import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import "./RegisterComponent.css";
import { useAuth } from "../../contexts/AuthContext.jsx";

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      await register(formData);
      alert("Registration successful. You can now log in.");
    } catch (err) {
      setErrors({ error: err.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Input
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter your username"
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Create a password"
        required
      />

      {errors.error && <p className="form-error">{errors.error}</p>}

      <Button type="submit" loading={loading}>
        Register
      </Button>
    </form>
  );
};

export default RegisterComponent;
