# Product List & Featured Integration - User Stories

This document contains user stories for integrating the Product API with frontend components, designed to be promptable for the Intern Mentor Agent.

---

## Epic 3: Product List & Featured Integration

### User Story 1: Product List Component
```
As a customer,
I want to see a list of products displayed in a grid or list format,
So that I can browse and discover available products on the website.
```
**Prompt for Agent:**
> Help me implement a "Product List" component for the frontend. This should include:
> - Creating a ProductList component that fetches products from GET /api/product
> - Using the existing Card component or creating a ProductCard component
> - Displaying product information: name, image, price, category
> - Using React hooks (useState, useEffect) for data fetching
> - Handling loading and error states
> - Adding proper CSS styling for the product grid

---

### User Story 2: Featured Products Component
```
As a customer,
I want to see featured products highlighted on the homepage,
So that I can quickly discover popular or special items.
```
**Prompt for Agent:**
> Help me implement a "Featured Products" component for the frontend. This should include:
> - Creating a FeaturedProducts component that fetches from GET /api/product/featured
> - Reusing the ProductList component or creating a similar display
> - Displaying only products where isFeatured is true
> - Adding a section title like "Featured Products" or "Special Offers"
> - Handling the case when no featured products exist

---

### User Story 3: Integrate Featured Products to Hero Component
```
As a customer,
I want to see featured products displayed in the hero section,
So that I can immediately see special offers when visiting the site.
```
**Prompt for Agent:**
> Help me integrate the FeaturedProducts component into the Hero component. This should include:
> - Importing the FeaturedProducts component into Hero.jsx
> - Displaying featured products below the hero text/call-to-action
> - Using conditional rendering to show products when data is loaded
> - Adding appropriate CSS styling
> - Handling loading state in the hero section

---

### User Story 4: Integrate Product List to Features/Products Page
```
As a customer,
I want to see all available products on a dedicated page,
So that I can browse the complete catalog.
```
**Prompt for Agent:**
> Help me integrate the ProductList component into the Features section (or create a Products page). This should include:
> - Updating Features.jsx or creating a new Products.jsx page
> - Fetching all active products from GET /api/product
> - Rendering products in a responsive grid
> - Adding a page title like "Our Products" or "Shop Now"
> - Adding CSS for product card styling

---

### User Story 5: Product Service
```
As a developer,
I want to have a centralized product service for API calls,
So that I can easily fetch products from different components.
```
**Prompt for Agent:**
> Help me create a productService.js in the services folder. This should include:
> - Creating functions: getAll(), getFeatured(), create(), update()
> - Making fetch calls to http://localhost:3000/api/product endpoints
> - Handling response status and error messages
> - Using async/await syntax
> - Exporting the service for use in components

---

## Implementation Order Recommendation

1. **Product Service** - Create inventoryService.js or productService.js for API calls
2. **Product List Component** - Create ProductList.jsx component
3. **Featured Products Component** - Create FeaturedProducts.jsx component
4. **Integrate to Hero** - Update Hero.jsx to show featured products
5. **Integrate to Features/Products Page** - Update Features.jsx or create Products.jsx
6. **Styling** - Add CSS for product grid and cards

---

## Quick Reference: Prompt Templates

### For Component Creation:
```
Create a [component name] component that:
1. [First requirement]
2. [Second requirement]
3. [Third requirement]
Use React hooks (useState, useEffect) and proper component structure.
```

### For API Integration:
```
Add API integration to [component name]:
- Fetch data from [endpoint]
- Handle loading and error states
- Display [specific data fields]
Use the existing service or create a new one.
```

### For CSS Styling:
```
Add CSS styling for [component name]:
- Use [grid/flexbox] layout
- Include [responsive] design
- Style [specific elements]
Follow the existing CSS patterns in the project.
```

---

## API Endpoints to Use

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/product` | Get all active products |
| GET | `/api/product?includeInactive=true` | Get all products (admin) |
| GET | `/api/product/featured` | Get featured products only |
| POST | `/api/product/create` | Create new product |
| PUT | `/api/product/update/:id` | Update product |
| POST | `/api/product/:id/feature` | Toggle featured |

---

## Component Structure Recommendation

```
src/
├── components/
│   ├── products/
│   │   ├── ProductList.jsx      # Grid of products
│   │   ├── ProductList.css
│   │   ├── FeaturedProducts.jsx # Featured products section
│   │   ├── FeaturedProducts.css
│   │   └── ProductCard.jsx      # Individual product card
│   │   └── ProductCard.css
│   └── landing/
│       ├── Hero.jsx              # Add featured products
│       ├── Features.jsx          # Replace with product list
│       └── ...
├── services/
│   └── productService.js         # API calls for products
│   └── inventoryService.js       # Existing (can extend)
└── pages/
    └── Products.jsx              # Full products page
```
