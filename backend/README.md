# Zoro Burger Backend API

This is the backend server for the Zoro Burger e-commerce website using MongoDB.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure MongoDB Connection**
   
   You need to set up your MongoDB Atlas connection string. See `MONGODB_SETUP.md` for detailed instructions.
   
   Quick setup:
   - Create a `.env` file in the `backend` folder
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zoro_burger?retryWrites=true&w=majority
     ```
   
   Or update `config/database.js` directly with your connection string.

3. **Start the Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access Points**
   - API Base URL: `https://zoroburger.com/api`
   - Admin Dashboard: `https://zoroburger.com/admin`
   - Rider App: `https://zoroburger.com/rider`
   - Frontend: Open `index.html` in your browser

## API Endpoints

### Products
- `GET /api/products` - Get all available products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders (with optional `?status=pending` query)
- `GET /api/orders/:id` - Get single order by ID or order number
- `PATCH /api/orders/:id` - Update order status

### Statistics
- `GET /api/stats` - Get order statistics for dashboard

### Admin
- `POST /api/admin/login` - Admin login (username: admin, password: admin123)

### Riders
- `POST /api/riders/login` - Rider login (phone and password)
- `GET /api/riders/available-orders` - Get orders awaiting rider assignment
- `POST /api/riders/accept-order/:orderId` - Accept an order (first come first serve)
- `GET /api/riders/my-orders/:riderId` - Get orders assigned to a rider
- `PATCH /api/riders/orders/:orderId/status` - Update order status (for rider)
- `PATCH /api/riders/:riderId/availability` - Update rider availability status

## Database

The backend uses **MongoDB Atlas** (cloud database).

### Collections
- **orders** - Stores all customer orders (includes rider assignment fields)
- **products** - Product catalog (can be managed via admin)
- **adminusers** - Admin user accounts
- **riders** - Rider accounts and information

### MongoDB Setup
See `MONGODB_SETUP.md` for complete setup instructions.

## Default Credentials

### Admin
- Username: `admin`
- Password: `admin123`

### Riders (Default test accounts)
- Phone: `03001234567`, Password: `rider123` (Ahmed Khan)
- Phone: `03001234568`, Password: `rider123` (Ali Hassan)
- Phone: `03001234569`, Password: `rider123` (Usman Malik)

**Note:** Change the default passwords in production!

## Order Status Flow
1. `ordered` - Order just placed by customer
2. `confirmed` - Order confirmed by head office (for pickup orders)
3. `awaiting_rider` - Order confirmed and waiting for rider to accept (for delivery orders)
4. `in_kitchen` - Order is being prepared in kitchen
5. `rider_on_way` - Rider is on the way to deliver
6. `delivered` - Order delivered to customer
7. `completed` - Order completed
8. `cancelled` - Order cancelled

## Rider System Workflow

1. **Customer places order** → Status: `ordered`
2. **Head office confirms order** → Status: `awaiting_rider` (for delivery) or `confirmed` (for pickup)
3. **Riders see available orders** → Orders with status `awaiting_rider` appear in rider app
4. **First rider accepts** → Order assigned to that rider, status changes to `in_kitchen`
5. **Rider updates status** → Can update to `rider_on_way` then `delivered`

### Features:
- **First Come First Serve**: When multiple riders see an order, the first one to accept gets it
- **Real-time Updates**: Rider app polls for new orders every 5 seconds
- **Order Management**: Riders can view order details and update delivery status
- **Availability Toggle**: Riders can mark themselves as available/unavailable

## Payment Status
- `pending` - Payment not yet received
- `paid` - Payment received
- `refunded` - Payment refunded

## Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **body-parser** - Request body parsing
- **dotenv** - Environment variables
- **uuid** - Unique ID generation

