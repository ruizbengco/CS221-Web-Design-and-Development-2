import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import "./Login.css";
import { useState } from "react";
import { useAuth } from "../contexts/authContext.jsx";

const Login = () => {
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const { login } = useAuth();

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

    try {
      // function call to backend
      await login(formData);
      alert("Login Successful!");
    } catch (error) {
      setErrors({ message: error.message });
    }
  };
  return (
    <Card title="Welcome Back!">
      <form className="login-form">
        <Input
          label="Email"
          type="email"
          name="email"
          error={errors.email}
          placeholder="Enter your email address"
          required
        ></Input>
        <Input
          label="Password"
          type="password"
          name="password"
          error={errors.password}
          placeholder="Enter your password"
          required
        ></Input>
        <Button type="submit" loading={loading}>
          Login
        </Button>
        <p className="auth-link">Don't have an account yet? Register here</p>
      </form>
    </Card>
  );
};

export default Login;
