import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import "./Login.css";
import LoginComponent from "../components/auth/LoginComponent.jsx";
import RegisterComponent from "../components/auth/RegisterComponent.jsx";

const Login = () => {
  return (
    <>
      <LoginComponent />
      <RegisterComponent />
    </>
  );
};

export default Login;
