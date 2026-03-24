import { useState } from "react";
import Card from "../components/Card";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import "./Login.css";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Card title={activeTab === "login" ? "Welcome Back" : "Create An Account"}>
      <div className="auth-tabs">
        <button
          type="button"
          className={"tab" + (activeTab === "login" ? " active" : "")}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={"tab" + (activeTab === "register" ? " active" : "")}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      <div className="auth-panel">
        {activeTab === "login" ? <LoginComponent /> : <RegisterComponent />}
      </div>
    </Card>
  );
};

export default AuthPage;
