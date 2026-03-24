import { useState } from "react";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import "./Login.css";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div>
      {activeTab === "login" ? (
        <LoginComponent onToggle={() => setActiveTab("register")} />
      ) : (
        <RegisterComponent onToggle={() => setActiveTab("login")} />
      )}
    </div>
  );
};

export default AuthPage;
