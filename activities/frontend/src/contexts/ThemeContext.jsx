import { createContext, useContext, useState, useEffect } from "react";

// Create a "supply closet" for theme (null = empty closet initially)
const ThemeContext = createContext(null);

// Key for storing theme choice in browser storage
const STORAGE_KEY = "app-theme";

// Provider component - wraps the app and provides theme access
export const ThemeProvider = ({ children }) => {
  // "memory box" for current theme - default to 'light'
  const [theme, setTheme] = useState("light");

  // When app starts, check if user previously saved a theme choice
  useEffect(() => {
    // Get saved theme from browser's localStorage
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    
    // If user previously chose a theme, use it
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // When theme changes, update the data-theme attribute on the document
  useEffect(() => {
    // Set theme on <html> element so CSS can respond
    document.documentElement.setAttribute("data-theme", theme);
    
    // Remember this choice for next time
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Function that switches between 'light' and 'dark'
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // What's inside the "supply closet"
  const value = {
    theme,        // Current theme ('light' or 'dark')
    toggleTheme,  // Function to switch themes
    isDark: theme === "dark", // Helper: true if dark mode is active
  };

  // Provide the closet contents to all children
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook - lets components easily access the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // Safety check - prevents bugs if hook is used outside Provider
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }
  
  return context;
};
