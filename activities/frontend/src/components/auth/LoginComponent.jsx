import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import "./LoginComponent.css";
import { useAuth } from "../../contexts/AuthContext.jsx";

const LoginComponent = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      await login(formData);
      alert("Login successful.");
    } catch (err) {
      setErrors({ error: err.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
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
        placeholder="Enter your password"
        required
      />

      {errors.error && <p className="form-error">{errors.error}</p>}

      <Button type="submit" loading={loading}>
        Login
      </Button>
    </form>
  );
};

export default LoginComponent;
