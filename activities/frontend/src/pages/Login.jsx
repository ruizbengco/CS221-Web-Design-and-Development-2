import Card from "../compnents/Card.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import "./Login.css"
import { useState } from "react";


const Login = () => {
    const [errors , setErrors] = useState({});
    const [loading, setLoading] = useState({});
    return(
        <Card title="Welcome Back!">
            <form className="login-form">
                <Input label="Email" type="email" name="email" error={errors.email} placeholder="Enter your email address" required></Input>
                <Input label="Password" type="password" name="password" error={errors.password} placeholder="Enter your password" required></Input>
                <Button type="submit" loading={loading}>Login</Button>
                <p className="auth-link">Don't have an account yet? Register here</p>
            </form>
        </Card>
    );
};

export default Login;
