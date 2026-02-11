import {useState} from 'react'
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import Input from "../components/TextArea.jsx";
import "./Login.css"

export default function Inventory() {
    const [loading, setLoading] = useState();
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})

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
      alert("Product Page.");
    } catch (error) {
      setErrors({ message: error.message });
    }
  };

  return (
    <Card title = "Create Product">   
        <form onSubmit={handleSubmit} className="login-form" >
        <Input
            label="Name"
            type="text"
            name="name"
            value={FormData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter product name"
            required
        />
        <Input
            label="Slug"
            type="text"
            name="slug"
            value={FormData.slug}
            onChange={handleChange}
            error={errors.slug}
            disabled
        />
        <TextArea
            label="Description"
            type="text"
            name="description"
            rows={10}
            cols={50}
            value={FormData.Description}
            onChange={handleChange}
            error={errors.Description}
            placeholder="Enter Description"
            required
        />
        <Input label="Price" 
            type="number" 
            value={FormData.price} 
            onChange={handleChange} 
            error={error.Price} 
            required style={{"resize: none;"}}
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
        </form>
    </Card>
  );
}
