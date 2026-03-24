import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../Card";
import Input from "../Input";
import Button from "../Button";

export default function LoginComponent({ onToggle }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  // e means element
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    })); // email and password
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // function call to backend
      await login(formData);

      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      setErrors({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Return the JSX to render
  return (
    <Card title="Welcome Back!">
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email address"
          required
        ></Input>
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          required
        ></Input>
        <Button type="submit" loading={loading}>
          Login
        </Button>
        <p className="auth-link">
          Don't have an account yet?{" "}
          <span className="auth-toggle" onClick={onToggle}>
            Register here
          </span>
        </p>
      </form>
    </Card>
  );
}
