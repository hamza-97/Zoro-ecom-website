# Quick Start Guide

## Step 1: Install Backend Dependencies

Open terminal in the project root and run:

```bash
cd backend
npm install
```

This will install all required packages (Express, SQLite, etc.)

## Step 2: Start the Backend Server

```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Admin dashboard: http://localhost:3000/admin
```

## Step 3: Open the Website

### Option A: Direct File Opening
Simply open `index.html` in your web browser.

### Option B: Local Server (Recommended)
Use a local server to avoid CORS issues:

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server
```

Then visit `http://localhost:8000`

## Step 4: Test the System

1. **Browse Products**: Add items to cart from the home page
2. **Checkout**: Click checkout button, fill in customer information
3. **Place Order**: Submit the order
4. **View Order**: See confirmation page with order number
5. **Admin Dashboard**: Visit `http://localhost:3000/admin` to view and manage orders

## Admin Dashboard Access

- URL: `http://localhost:3000/admin`
- Username: `admin`
- Password: `admin123`

## Troubleshooting

### Backend won't start
- Make sure Node.js is installed: `node --version`
- Check if port 3000 is already in use
- Try deleting `backend/database.sqlite` and restarting

### Orders not saving
- Make sure backend server is running
- Check browser console for errors
- Verify API URL in checkout.html matches your backend URL

### CORS errors
- Use a local server instead of opening HTML files directly
- Or update CORS settings in `backend/server.js`

## Next Steps

- Change default admin password
- Add more products via database
- Customize styling
- Add payment gateway integration

