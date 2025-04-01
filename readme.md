ShoppyGlobe API Documentation

Project Overview

Project: Build APIs with Node.js and Express.js for ShoppyGlobe E-commerceObjective: Develop the backend for ShoppyGlobe using Node.js, Express, and MongoDB.

Getting Started
Prerequisites
Node.js 16.x or later
npm 7.x or later
Installation



File Structure

ShoppyGlobe-Backend/
├── node_modules/            # Installed dependencies
├── public/                  # Public assets (if any)
├── src/
│   ├── controllers/
│   │   ├── authController.js    # Handles user authentication
│   │   ├── cartController.js    # Manages shopping cart operations
│   │   ├── productController.js # Handles product-related requests
│   ├── db/
│   │   ├── index.js                # MongoDB connection setup
│   ├── middlewares/
│   │   ├── auth.middleware.js    # Middleware for JWT authentication
│   │   ├── error.middleware.js   # Middleware for error handling
│   ├── models/
│   │   ├── cartModel.js         # Mongoose schema for Cart
│   │   ├── productModel.js      # Mongoose schema for Product
│   │   ├── userModel.js         # Mongoose schema for User authentication
│   ├── routes/
│   │   ├── auth.routes.js        # Routes for user authentication
│   │   ├── cart.routes.js        # Routes for cart operations
│   │   ├── product.routes.js     # Routes for product retrieval
│   ├── index.js                 # Main entry point for Express server
├── .env                         # Environment variables (MongoDB URI, JWT Secret, etc.)
├── package.json                  # Dependencies and scripts
├── package-lock.json              # Dependency lock file
├── README.md                     # Documentation and setup guide


API Endpoints

Product Routes

GET /api/products - Get all products.

GET /api/products/********:id - Get product details by ID.

POST /api/product -- Creating a new Prpduct.

Cart Routes (Protected)

GET /api/cart --- Get user's Cart.

POST /api/cart - Add product to cart.

PUT /api/cart/********:id - Update product quantity in cart.

DELETE api/cart/********:id - Remove product from cart.

Authentication Routes

POST /api/auth/registerUser - Register a user.

POST /api/auth/loginUser - Authenticate user and get JWT.



GITHUB LINK :  https://github.com/harshu-789/Backend_project_final



