import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const CartContext = createContext(null);

// Key prefix for localStorage
const CART_PREFIX = "cart_";

export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);
  // State to track if cart is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Current user ID
  const [userId, setUserId] = useState(null);

  // Get the storage key for the current user
  const getCartKey = () => {
    return CART_PREFIX + (userId || "guest");
  };

  // Load cart from localStorage
  const loadCart = () => {
    const key = getCartKey();
    const savedCart = localStorage.getItem(key);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart:", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  };

  // Save cart to localStorage
  const saveCart = (items) => {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(items));
  };

  // Check auth status
  useEffect(() => {
    const checkAuth = () => {
      const user = authService.getCurrentUser();
      const token = authService.getToken();
      const loggedIn = !!user && !!token;
      
      setIsLoggedIn(loggedIn);
      setUserId(user?._id || null);
    };

    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => checkAuth();
    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Load cart when user changes
  useEffect(() => {
    if (isLoggedIn && userId) {
      loadCart();
    } else {
      setCartItems([]);
    }
    setIsLoaded(true);
  }, [isLoggedIn, userId]);

  // Function to add item to cart
  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      let updatedItems;
      if (existingItem) {
        // Increase quantity if already in cart
        updatedItems = prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }

      saveCart(updatedItems);
      return updatedItems;
    });
  };

  // Function to add item with specific quantity
  const addToCartWithQuantity = (product, quantity) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity }];
      }

      saveCart(updatedItems);
      return updatedItems;
    });
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== productId);
      saveCart(updatedItems);
      return updatedItems;
    });
  };

  // Function to increase quantity
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(updatedItems);
      return updatedItems;
    });
  };

  // Function to decrease quantity
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => {
          if (item._id === productId) {
            if (item.quantity <= 1) {
              return null; // Mark for removal
            }
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(Boolean);

      saveCart(updatedItems);
      return updatedItems;
    });
  };

  // Function to clear cart
  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  // Calculate total items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Value to provide
  const value = {
    cartItems,
    addToCart,
    addToCartWithQuantity,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoaded,
    isLoggedIn,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }
  return context;
};
