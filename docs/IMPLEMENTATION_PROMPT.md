# E-Commerce Implementation Guide

This document outlines the features to be built for the MERN stack e-commerce application.

---

## Current Status

### ✅ Already Built
- Backend Express server with MongoDB/Mongoose
- User Model (username, email, password with bcrypt hashing)
- Auth Routes: Register, Login, Logout with JWT tokens
- Product Model (name, description, price, image, category, stock, isActive, isFeatured)
- Frontend React + Vite setup
- AuthContext for authentication state management
- Auth service (authService.js) and Product service (productService.js)

### ❌ Missing Features (To Be Built)

---

## Feature 1: Product Browsing (Homepage)

**Description**: Display all products on the homepage with images, prices, and descriptions.

**Requirements**:
- Fetch all active products from `/api/product`
- Display products in a grid or list layout
- Show product image, name, price, and description for each product
- Add "Add to Cart" button for each product
- Handle loading and error states

**Files to Create/Modify**:
- `activities/frontend/src/pages/Home.jsx` - New homepage component
- `activities/frontend/src/components/products/ProductCard.jsx` - Product display component
- `activities/frontend/src/App.jsx` - Add route for homepage

---

## Feature 2: Product Search/Filter

**Description**: Allow users to search products by name or filter by category.

**Requirements**:
- Search input field to filter by product name
- Category dropdown to filter by category
- Real-time filtering (update results as user types/selects)
- Show "No products found" message when no matches

**Files to Create/Modify**:
- `activities/frontend/src/components/products/SearchBar.jsx` - Search input component
- `activities/frontend/src/components/products/CategoryFilter.jsx` - Category filter dropdown
- Modify `activities/frontend/src/pages/Home.jsx` - Integrate search and filter

---

## Feature 3: Shopping Cart (State Management)

**Description**: Allow users to add, remove, and update quantities of items in cart.

**Requirements**:
- Create CartContext for cart state management
- Add item to cart (if exists, increase quantity)
- Remove item from cart
- Update item quantity (increase/decrease)
- Calculate cart total items and total price
- Persist cart to localStorage (survives page refresh)

**Files to Create/Modify**:
- `activities/frontend/src/contexts/CartContext.jsx` - New cart state management
- `activities/frontend/src/components/cart/CartIcon.jsx` - Cart icon with item count badge
- Modify `activities/frontend/src/App.jsx` - Add CartProvider

---

## Feature 4: Shopping Cart Page

**Description**: Display cart items with options to modify quantities or remove items.

**Requirements**:
- List all items in cart with quantity controls (+/- buttons)
- Show item image, name, price, quantity, and subtotal
- Remove item button
- Display cart total at the bottom
- "Continue Shopping" button to go back to products
- "Proceed to Checkout" button

**Files to Create/Modify**:
- `activities/frontend/src/pages/Cart.jsx` - Cart page component
- `activities/frontend/src/components/cart/CartItem.jsx` - Individual cart item row

---

## Feature 5: Checkout Process

**Description**: Summary page showing total price and "Place Order" button.

**Requirements**:
- Display order summary (list of items, quantities, prices)
- Calculate and display order total
- Show shipping information form (basic fields)
- "Place Order" button to submit order
- Clear cart after successful order
- Show success/ confirmation message after ordering

**Files to Create/Modify**:
- `activities/frontend/src/pages/Checkout.jsx` - Checkout page
- `activities/frontend/src/services/orderService.js` - Order API service (new)
- `activities/frontend/src/App.jsx` - Add checkout route

---

## Feature 6: Backend - Order System (Optional)

**Description**: Backend support for saving orders.

**Requirements**:
- Order Model (items, user info, total, status, date)
- Order Routes (create order, get user orders)
- Order Controller

**Files to Create/Modify**:
- `activities/backend/models/Order.js` - New order model
- `activities/backend/routes/orderRoutes.js` - New order routes
- `activities/backend/controllers/orderController.js` - New order controller
- Modify `activities/backend/index.js` - Add order routes

---

## API Endpoints Summary

### Existing Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/product` - Get all active products
- `GET /api/product/featured` - Get featured products
- `POST /api/product/create` - Create product (admin)
- `PUT /api/product/update/:id` - Update product (admin)

### New Endpoints (Optional - for database cart/orders)
- `POST /api/order/create` - Create new order
- `GET /api/order/user/:userId` - Get user's orders

---

## Implementation Order (Recommended)

1. **First**: Build Product Browsing (Homepage) - see products on screen
2. **Second**: Add Search/Filter - find products easily
3. **Third**: Build Cart Context - manage cart state
4. **Fourth**: Build Cart Page - view and modify cart
5. **Fifth**: Build Checkout - finalize purchase

---

## Notes

- Use localStorage for cart persistence (simpler than database)
- Keep React components simple and focused
- Use the AuthContext that already exists for user authentication
- Follow the existing code style (functional components, hooks)
