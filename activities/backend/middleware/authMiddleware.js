import jwt from "jsonwebtoken";

// Middleware to protect routes - extracts user from JWT token
export const protect = async (req, res, next) => {
  try {
    // Get token from Authorization header
    let token = null;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Auth middleware - Token:", token ? "present" : "missing");
    console.log("Auth middleware - URL:", req.originalUrl);

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Auth middleware - Decoded user:", decoded);
    
    // Add user info to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name,
    };

    next();
  } catch (error) {
    console.log("Auth middleware - Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed." });
  }
};

// Middleware to check if user is admin
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as an admin." });
  }
};
