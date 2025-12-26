# MongoDB Setup Instructions

## Step 1: Get Your MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in to your account
3. Click on "Connect" for your cluster
4. Choose "Connect your application"
5. Copy the connection string

The connection string should look like:
```
mongodb+srv://hamzadha5_db_user:3256lerAr1WK22eJ@cluster0.xxxxx.mongodb.net/zoro_burger?retryWrites=true&w=majority
```

**Important:** Replace `cluster0.xxxxx` with your actual cluster URL from MongoDB Atlas.

## Step 2: Update Connection String

You have two options:

### Option A: Use .env file (Recommended)

1. Create a `.env` file in the `backend` folder:
   ```bash
   cd backend
   touch .env
   ```

2. Add your connection string:
   ```
   MONGODB_URI=mongodb+srv://hamzadha5_db_user:3256lerAr1WK22eJ@YOUR_CLUSTER.mongodb.net/zoro_burger?retryWrites=true&w=majority
   ```

   Replace `YOUR_CLUSTER` with your actual cluster URL.

### Option B: Update database.js directly

Edit `backend/config/database.js` and replace the connection string with your actual MongoDB Atlas connection string.

## Step 3: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- mongoose (MongoDB driver)
- dotenv (for environment variables)

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
MongoDB Connected Successfully
Server running on http://localhost:3000
```

## Troubleshooting

### Connection Error
- Make sure your IP address is whitelisted in MongoDB Atlas
- Go to Network Access in MongoDB Atlas and add your IP (or 0.0.0.0/0 for all IPs)
- Verify your username and password are correct
- Check that your cluster URL is correct

### Authentication Error
- Double-check your username and password
- Make sure the database user has read/write permissions

## Database Collections

The following collections will be automatically created:
- `orders` - All customer orders
- `products` - Product catalog
- `adminusers` - Admin user accounts

## Default Admin

The default admin user is automatically created:
- Username: `admin`
- Password: `admin123`

**Change this in production!**


