# Zoro Burger E-Commerce Website

A full-featured e-commerce website for Zoro Burger restaurant with order management and admin dashboard.

## Features

- 🍔 **Product Catalog** - Browse burgers, shakes, and desserts
- 🛒 **Shopping Cart** - Add items to cart and manage quantities
- 📦 **Order Placement** - Complete checkout flow with customer information
- 📊 **Admin Dashboard** - Manage orders, view statistics, update order status
- 📱 **Responsive Design** - Works on all devices
- 🎬 **Loading Animation** - Full-screen video loading screen

## Project Structure

```
Zoro/
├── index.html              # Home page
├── menu.html              # Menu page
├── checkout.html          # Checkout page
├── order-confirmation.html # Order confirmation page
├── admin.html             # Admin dashboard
├── styles.css             # Main stylesheet
├── script.js              # Frontend JavaScript
├── menu-script.js         # Menu page JavaScript
├── backend/               # Backend API
│   ├── server.js          # Express server
│   ├── package.json       # Dependencies
│   └── database.sqlite    # SQLite database (auto-created)
└── ZoroImages/        # Product images
```

## Getting Started

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start the Backend Server

```bash
npm start
```

The server will run on `http://localhost:3000`

### 3. Open the Website

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then visit `http://localhost:8000`

## Usage

### For Customers

1. Browse the menu on the home page or menu page
2. Add items to cart
3. Click "Checkout" in the cart
4. Fill in your information and place order
5. Receive order confirmation with order number

### For Admins

1. Visit `https://zoroburger.com/admin`
2. View all orders and statistics
3. Update order status (pending → preparing → ready → completed)
4. View detailed order information

## Admin Dashboard Features

- **Statistics Overview**
  - Total orders
  - Today's orders
  - Total revenue
  - Today's revenue

- **Order Management**
  - View all orders
  - Filter by status
  - Update order status
  - View order details
  - Track payment status

## API Endpoints

See `backend/README.md` for complete API documentation.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Styling**: Custom CSS with Poppins font

## Notes

- The backend must be running for checkout and admin features to work
- Default admin credentials: username: `admin`, password: `admin123`
- Orders are stored in SQLite database
- Cart is stored in browser localStorage

## Future Enhancements

- User authentication
- Payment gateway integration
- Email notifications
- Order tracking for customers
- Product management in admin panel
- Multiple admin users with roles

