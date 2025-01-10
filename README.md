# 💍 Jewelry E-Commerce API 💎

This Node.js application provides a robust and scalable RESTful API for managing jewelry items, users, orders, and carts within an e-commerce platform.

## ✨ Features ✨

*   **👤 User Management:**
    *   🔐 Registration with OTP verification for enhanced security.
    *   🔑 Login using JWT tokens for stateless authentication.
    *   🏠 Manage user addresses for efficient order placement.
*   **💎 Jewelry Management:**
    *   ➕ Create, 🔄 retrieve, ✏️ update, and 🗑️ delete jewelry items.
    *   🖼️ Upload and manage jewelry images for product visualization.
    *   🔍 Search for jewelry by model number.
*   **📦 Order Management:**
    *   🛍️ Place orders for user's cart items.
    *   🧾 Retrieve order details by ID.
    *   🧑‍💼 Admin/Super Admin view of all orders.
    *   ✅ Update order status.
*   **🛒 Cart Management:**
    *   🛍️ View currently active cart for the authenticated user.
    *   ➕ Add items to the cart.
    *   🔢 Update cart quantities.
    *   ❌ Delete items from the cart.
    *   💸 Checkout process to generate an order.

## 🛠️ Technologies 🛠️

*   ⚙️ Node.js: Server-side runtime environment.
*   🚀 Express.js: Web framework for building APIs.
*   💾 MongoDB (or your preferred database): Data persistence layer.
*   🔑 JWT: JSON Web Token for secure authentication.
*   📍 (Optional) Third-party API: Pincode verification.

## ⚙️ Installation ⚙️

1.  Clone this repository: `git clone https://github.com/your-username/jewelry-api.git`
2.  Navigate to the project directory: `cd jewelry-api`
3.  Install dependencies: `npm install`
4.  Set up your database connection and configure environment variables (see `.env.example` for guidance).
5.  Create a `.env` file and populate it with your specific values.

## 🚀 Running the API 🚀

1.  Start the server: `npm start` (or `node index.js`)

## 📖 API Endpoints 📖

This API follows RESTful principles and uses JSON for data exchange.

### 🔐 Authentication (Auth) 🔐

<details>
<summary>Click to expand</summary>

| Method | Endpoint          | Description                                         |
| :----- | :---------------- | :-------------------------------------------------- |
| POST   | `/auth/generate-otp` | Generates an OTP for user registration.            |
| POST   | `/auth/verify-otp`   | Verifies OTP and registers a new user.              |
| POST   | `/auth/login`      | Logs in a user and returns a JWT token.              |

</details>

### 👤 User Management 👤

<details>
<summary>Click to expand</summary>

| Method | Endpoint        | Description                                     | Authentication |
| :----- | :-------------- | :---------------------------------------------- | :------------- |
| GET    | `/addresses`    | Retrieves all addresses for the authenticated user. | JWT Required   |
| POST   | `/addresses`    | Creates a new address for the authenticated user. | JWT Required   |
| PUT    | `/addresses/{id}` | Updates an existing address by ID.             | JWT Required   |
| DELETE | `/addresses/{id}` | Deletes an address by ID.                     | JWT Required   |

</details>

### 💎 Jewelry Management 💎

<details>
<summary>Click to expand</summary>

| Method | Endpoint              | Description                                        | Authentication |
| :----- | :-------------------- | :------------------------------------------------- | :------------- |
| GET    | `/jewelry`           | Retrieves all jewelry items.                       |                |
| POST   | `/jewelry`           | Creates a new jewelry item.                       | JWT Required   |
| GET    | `/jewelry/{modelNumber}` | Retrieves a jewelry item by model number.          |                |
| PUT    | `/jewelry/{modelNumber}` | Updates an existing jewelry item by model number.  | JWT Required   |
| DELETE | `/jewelry/{modelNumber}` | Deletes a jewelry item by model number.          | JWT Required   |
| POST   | `/images/upload`      | Uploads an image for a jewelry item.              | JWT Required   |
| GET    | `/images/{jewelryId}/images` | Retrieves all images for a specific jewelry item. |                |
| GET    | `/images/{id}`        | Retrieves a specific image by ID.                |                |

</details>

### 📦 Order Management 📦

<details>
<summary>Click to expand</summary>

| Method | Endpoint                | Description                                        | Authentication |
| :----- | :---------------------- | :------------------------------------------------- | :------------- |
| POST   | `/orders`               | Places a new order.                               | JWT Required   |
| GET    | `/orders`               | Gets all orders for the authenticated user.        | JWT Required   |
| GET    | `/orders/{orderId}`      | Gets order details by order ID.                   | JWT Required   |
| GET    | `/orders/admin/all`    | Gets all orders (Admin/Super Admin only).        | Admin JWT      |
| PUT    | `/orders/{orderId}/status` | Updates the status of an existing order.        | Admin JWT      |

</details>

### 🛒 Cart Management 🛒

<details>
<summary>Click to expand</summary>

| Method | Endpoint        | Description                               | Authentication |
| :----- | :-------------- | :---------------------------------------- | :------------- |
| GET    | `/cart`          | Gets the cart for the authenticated user. | JWT Required   |
| POST   | `/cart/add`      | Adds an item to the cart.                 | JWT Required   |
| PUT    | `/cart/update`   | Updates the cart quantity for an item.   | JWT Required   |
| DELETE | `/cart/{cartId}` | Deletes an item from the cart.           | JWT Required   |
| POST   | `/cart/checkout` | Checkouts and places orders for cart items. | JWT Required   |

</details>

## ⚠️ Error Handling ⚠️

The API returns appropriate HTTP status codes and JSON error messages in case of errors.

## 🤝 Contributing 🤝

Contributions are welcome! Please open an issue or submit a pull request.
