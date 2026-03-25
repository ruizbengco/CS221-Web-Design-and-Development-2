w# Product API - User Stories

This document contains the user stories for the Product API, designed to be promptable for the Intern Mentor Agent.

---

## Epic 1: Product API

### User Story 1: List Products Endpoint

```
As a customer,
I want to be able to browse all available products in the catalog,
So that I can see what items are available for purchase.
```

**Prompt for Agent:**

> Help me implement the "List Products" feature for the Product API. This should include:
>
> - Creating a Mongoose schema for products with fields like name, description, price, image, category, stock, etc.
> - Creating a GET /api/product endpoint that returns all products
> - Using proper error handling with try/catch
> - Returning a proper JSON response with status codes

---

### User Story 2: Active Listing

```
As a customer,
I want to see only active products when browsing the catalog,
So that I don't see unavailable or hidden items.
```

**Prompt for Agent:**

> Help me implement the "Active Listing" feature for the Product API. This should include:
>
> - Adding an `isActive` boolean field (default: true) to the Product schema
> - Updating the GET /api/product endpoint to only return products where `isActive` is true
> - Adding a query parameter to optionally include inactive products (for admin use)
> - Explain the logic behind filtering active products in MongoDB using `.find({ isActive: true })`

---

### User Story 3: Featured Items

```
As a customer,
I want to see featured products highlighted on the homepage,
So that I can quickly discover popular or special items.
```

**Prompt for Agent:**

> Help me implement the "Featured Items" feature for the Product API. This should include:
>
> - Adding an `isFeatured` boolean field (default: false) to the Product schema
> - Creating a GET /api/product/featured endpoint to fetch only featured products
> - Adding a POST /api/product/:id/feature endpoint to mark a product as featured (or toggle it)
> - Explain how to use MongoDB query filters like `.find({ isFeatured: true })`

---

## Epic 2: Authentication

### User Story 4: Authentication Layer

```
As a developer,
I want to secure the Product API endpoints,
So that only authenticated users can create, update, or delete products.
```

**Prompt for Agent:**

> Help me implement the "Authentication Layer" for the Product API. This should include:
>
> - Creating a JWT middleware function that verifies the authorization token
> - Adding the middleware to protect POST, PUT, and DELETE routes
> - Allowing GET routes to be public (accessible without authentication)
> - Return 401 Unauthorized when no valid token is provided
> - Explain how to extract and verify the token from the Authorization header

---

### User Story 5: Create Product (Protected)

```
As an admin,
I want to add new products to the catalog,
So that customers can purchase new items.
```

**Prompt for Agent:**

> Help me implement the "Create Product" feature. This should include:
>
> - Creating a POST /api/product endpoint
> - Adding validation for required fields (name, price, etc.)
> - Protecting the route with JWT authentication middleware
> - Returning the created product with 201 status code
> - Using proper async/await with try/catch error handling

---

### User Story 6: Update Product (Protected)

```
As an admin,
I want to modify existing product details,
So that I can keep the catalog up to date with correct information.
```

**Prompt for Agent:**

> Help me implement the "Update Product" feature. This should include:
>
> - Creating a PUT /api/product/:id endpoint
> - Adding validation for the product ID
> - Protecting the route with JWT authentication middleware
> - Using Mongoose's `findByIdAndUpdate` method
> - Returning the updated product with 200 status code

---

### User Story 7: Delete Product (Protected)

```
As an admin,
I want to remove products from the catalog,
So that discontinued or out-of-stock items are no longer shown.
```

**Prompt for Agent:**

> Help me implement the "Delete Product" feature. This should include:
>
> - Creating a DELETE /api/product/:id endpoint
> - Adding validation for the product ID
> - Protecting the route with JWT authentication middleware
> - Using Mongoose's `findByIdAndDelete` method
> - Returning a success message with 200 status code
> - Optionally: soft delete by setting `isActive` to false instead of hard delete

---

## Quick Reference: Prompt Templates

### For Mongoose Schema:

```
Create a Mongoose schema for [feature name] with the following fields:
- [field 1]: [type and description]
- [field 2]: [type and description]
Include default values and any validation rules.
```

### For API Endpoint:

```
Create a [GET/POST/PUT/DELETE] endpoint for [resource] that:
1. [First requirement]
2. [Second requirement]
3. [Third requirement]
Use proper Express.js patterns with async/await and error handling.
```

### For Authentication:

```
Add JWT authentication middleware to protect the following endpoints:
- [endpoint 1]
- [endpoint 2]
Explain how to extract the token and verify it.
```

---

## Implementation Order Recommendation

1. **Product Schema** - Base model for all product features
2. **List Products** - Basic GET endpoint
3. **Active Listing** - Filter by isActive
4. **Featured Items** - Filter by isFeatured
5. **Create Product** - POST with auth
6. **Update Product** - PUT with auth
7. **Delete Product** - DELETE with auth
8. **Authentication Middleware** - Secure all protected routes
