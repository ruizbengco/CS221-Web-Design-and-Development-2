import AuthPage from "./pages/AuthPage.jsx";
import Inventory from "./pages/inventory.jsx";
import Landing from "./pages/Landing";
import Login from "./pages/Login.jsx";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
