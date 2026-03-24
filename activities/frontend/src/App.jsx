import AuthPage from "./pages/AuthPage.jsx";
import Inventory from "./pages/Inventory.jsx";
import Landing from "./pages/Landing";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import MyProducts from "./pages/MyProducts.jsx";
import Cart from "./pages/Cart.jsx";
import Layout from "./components/Layout.jsx";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/products" element={<Products />} />
              <Route path="/my-products" element={<MyProducts />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
