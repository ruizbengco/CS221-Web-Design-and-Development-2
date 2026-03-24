import { useTheme } from "../contexts/ThemeContext.jsx";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  // Get theme state and toggle function from our "supply closet"
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Sun icon (shown in dark mode) */}
      <span className="icon sun">☀️</span>
      
      {/* The toggle switch track */}
      <span className="switch-track">
        {/* The toggle switch thumb (the sliding circle) */}
        <span className="switch-thumb"></span>
      </span>
      
      {/* Moon icon (shown in light mode) */}
      <span className="icon moon">🌙</span>
    </button>
  );
}
