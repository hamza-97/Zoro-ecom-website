# PWA and Push Notifications Setup Guide

## Overview
The rider.html page is now a Progressive Web App (PWA) with push notification support. All riders will receive notifications when new orders become available.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

This will install the `web-push` package required for push notifications.

### 2. Generate VAPID Keys
VAPID keys are required for push notifications. Generate them using:

```bash
cd backend
node generate-vapid-keys.js
```

This will output your public and private keys. Copy them.

### 3. Configure VAPID Keys
You have two options:

**Option A: Environment Variables (Recommended for Production)**
Create a `.env` file in the `backend` directory:
```
VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
```

Make sure to install `dotenv` if not already installed:
```bash
npm install dotenv
```

Then add this to the top of `server.js`:
```javascript
require('dotenv').config();
```

**Option B: Direct Configuration**
Update the VAPID keys directly in `backend/server.js`:
```javascript
const VAPID_PUBLIC_KEY = 'your_public_key_here';
const VAPID_PRIVATE_KEY = 'your_private_key_here';
```

### 4. Start the Server
```bash
cd backend
npm start
```

### 5. Access the Rider App
Open `https://zoroburger.com/rider` in a browser that supports PWAs (Chrome, Edge, Firefox, Safari).

### 6. Install as PWA
- **Chrome/Edge**: Click the install icon in the address bar
- **Safari (iOS)**: Tap Share → Add to Home Screen
- **Firefox**: Click the menu → Install

## How It Works

1. **Rider Login**: When a rider logs in, the app automatically:
   - Requests notification permission
   - Subscribes to push notifications
   - Saves the subscription to the database

2. **New Order Notification**: When an admin confirms a delivery order:
   - The order status changes to `awaiting_rider`
   - The backend sends push notifications to all available riders
   - Riders receive a notification even if the app is closed

3. **Notification Actions**:
   - Clicking the notification opens the rider app
   - Shows available orders tab automatically

## Testing Push Notifications

1. Log in as a rider at `https://zoroburger.com/rider`
2. Grant notification permission when prompted
3. In another browser/device, place an order and have admin confirm it
4. The rider should receive a push notification

## Troubleshooting

### Notifications Not Working?
1. Check browser console for errors
2. Verify VAPID keys are correctly set
3. Ensure the service worker is registered (check Application tab in DevTools)
4. Check that notification permission is granted
5. Verify the rider has push subscriptions saved in the database

### Service Worker Not Registering?
1. Make sure `sw.js` is accessible at the root
2. Check browser console for registration errors
3. Clear browser cache and reload

### Push Notifications Not Sending?
1. Check backend logs for errors
2. Verify `web-push` package is installed
3. Ensure VAPID keys are valid (regenerate if needed)
4. Check that riders have subscriptions saved

## Security Notes

- **Never commit VAPID private keys to version control**
- Use environment variables in production
- The private key should remain secret
- Only the public key is sent to the client

## Browser Support

- ✅ Chrome/Edge (Desktop & Android)
- ✅ Firefox (Desktop & Android)
- ✅ Safari (iOS 16.4+)
- ⚠️ Safari (Desktop) - Limited support

## Features

- ✅ PWA installation support
- ✅ Offline capability (cached resources)
- ✅ Push notifications for new orders
- ✅ Automatic subscription management
- ✅ Notification click handling
- ✅ Service worker updates


