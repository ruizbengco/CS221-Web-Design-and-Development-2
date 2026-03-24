import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../Card";
import Input from "../Input";
import Button from "../Button";

export default function RegisterComponent() {
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState({});

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
    setLoading(true);

    try {
      // function call to backend
      const user = await login(formData);
      console.log(user);

      alert("Login Successful!");
    } catch (error) {
      setErrors({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Return the JSX to render
  return (
    <Card title="Create an Account!">
      <form onSubmit={handleSubmit} className="register-form">
        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="Enter your username"
          required
        ></Input>
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
          Register
        </Button>
      </form>
    </Card>
  );
}
